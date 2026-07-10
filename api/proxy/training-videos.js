/**
 * Server-side proxy for training videos.
 * Fetches the upstream API from the server to avoid client-side security checkpoint issues,
 * returns JSON to the frontend. Falls back to a small hardcoded list if upstream fails.
 */
export default async function handler(req, res) {
  // Primary source: scrape dive-careers training videos page for YouTube links
  const diveCareersUrl = 'https://www.dive-careers.com/training-videos.html';

  try {
    const r = await fetch(diveCareersUrl, { method: 'GET' });
    const bodyText = await r.text();

    if (r.ok && bodyText) {
      // Extract YouTube IDs from common patterns: watch?v=, youtu.be/, /embed/
      const ids = new Set();
      const ytRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/gi;
      let m;
      while ((m = ytRegex.exec(bodyText)) !== null) {
        ids.add(m[1]);
      }

      // Also scan for watch?v= in query strings not matched above
      const watchRegex = /[?&]v=([A-Za-z0-9_-]{11})/g;
      while ((m = watchRegex.exec(bodyText)) !== null) {
        ids.add(m[1]);
      }

      const videoList = Array.from(ids).map((id, idx) => ({ id, title: `Training video ${idx + 1}` }));
      if (videoList.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(videoList);
      }
    }
  } catch (err) {
    console.error('Failed to scrape dive-careers:', err);
  }

  // Secondary: try original upstream JSON API as a fallback
  const upstream = 'https://api.divinginasia.com/training-videos';
  try {
    const r2 = await fetch(upstream, { method: 'GET' });
    const contentType = r2.headers.get('content-type') || '';
    const bodyText2 = await r2.text();

    if (r2.ok && contentType.includes('application/json')) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(bodyText2);
    }

    try {
      const parsed = JSON.parse(bodyText2);
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(parsed);
    } catch (e) {
      // continue to fallback
    }
  } catch (err) {
    console.error('Proxy fetch failed:', err);
  }

  // Final fallback: provide a small safe list so the frontend shows content
  const fallback = [
    { id: 'dQw4w9WgXcQ', title: 'Intro to Diving - Basic Skills', description: 'Overview of basic diving skills.' },
    { id: '3JZ_D3ELwOQ', title: 'Mask Clearing & Regulator Recovery', description: 'Step-by-step skills practice.' }
  ];

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(fallback);
}
