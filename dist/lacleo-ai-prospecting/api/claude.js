// LaCleo demo — Claude backend (Vercel serverless function)
// ---------------------------------------------------------------
// This makes the AI features (outreach drafting + signal analysis)
// call the real Claude API. To enable it:
//   1. Deploy the `lacleo-ai-prospecting` folder to Vercel.
//   2. In the Vercel project → Settings → Environment Variables, add:
//        ANTHROPIC_API_KEY = <your Anthropic API key>
//      (optional) CLAUDE_MODEL = claude-sonnet-5   // or claude-haiku-4-5-20251001
//   3. Redeploy. The frontend auto-detects the backend and switches
//      from "smart template" mode to live "Written by Claude" mode.
//
// If no key is set, the endpoint responds ok:false and the frontend
// falls back to its built-in generator — so the demo never breaks.

export default async function handler(req, res) {
  // Simple health probe used by the frontend to detect the backend.
  if (req.method === 'GET') {
    res.status(200).json({ ok: true, backend: true, hasKey: !!process.env.ANTHROPIC_API_KEY });
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    res.status(200).json({ ok: false, error: 'no_key' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { task, input } = body;
    const built = buildPrompt(task, input || {});
    if (!built) {
      res.status(200).json({ ok: false, error: 'bad_task' });
      return;
    }

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: process.env.CLAUDE_MODEL || 'claude-sonnet-5',
        max_tokens: 1024,
        system: built.system,
        messages: [{ role: 'user', content: built.user }]
      })
    });

    if (!r.ok) {
      const detail = (await r.text()).slice(0, 400);
      res.status(200).json({ ok: false, error: 'api_' + r.status, detail });
      return;
    }

    const data = await r.json();
    const text = (data.content || []).map((b) => b.text || '').join('').trim();
    res.status(200).json({ ok: true, text });
  } catch (e) {
    res.status(200).json({ ok: false, error: 'exception', detail: String(e).slice(0, 400) });
  }
}

function buildPrompt(task, input) {
  if (task === 'outreach') {
    const client = input.client || 'our company';
    return {
      system:
        'You are an expert B2B sales development rep writing a first-touch cold outreach email on behalf of ' +
        client +
        '. Rules: 55-90 words, plain and specific, reference the prospect\'s buying signal concretely, tie it to a clear reason ' +
        client +
        ' is relevant, and end with one low-friction call to action (a 15-minute look/chat). No subject line, no greeting header beyond "Hi <first name>,", no markdown, no placeholders. Return ONLY the email body text.',
      user:
        'Write the outreach email.\n\n' +
        JSON.stringify(
          {
            from_company: client,
            what_we_sell: input.valueProp || '',
            prospect_company: input.company || '',
            contact_name: input.contact || '',
            contact_title: input.title || '',
            location: input.region || '',
            buying_signal: input.signal || '',
            signal_evidence: input.evidence || '',
            recommended_angle: input.angle || ''
          },
          null,
          2
        )
    };
  }
  if (task === 'signal') {
    return {
      system:
        'You are a B2B buying-signal analyst. Read the raw text and identify the single strongest buying signal for a seller. ' +
        'Return STRICT minified JSON only (no prose, no markdown) with keys: ' +
        '"signal" (short label), "confidence" (integer 0-100), "persona" (the buyer role to contact), ' +
        '"angle" (one-sentence outreach angle), "rationale" (one sentence citing the evidence). ' +
        'If the text has no clear signal, use signal "No strong signal" with low confidence.',
      user:
        'Seller context: ' +
        (input.client || 'a B2B vendor') +
        (input.valueProp ? ' — ' + input.valueProp : '') +
        '\n\nText to analyze:\n"""' +
        String(input.text || '').slice(0, 2000) +
        '"""'
    };
  }
  return null;
}
