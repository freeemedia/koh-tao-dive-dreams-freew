export default function handler(req, res) {
  const host = req.headers.host || '';

  // Redirect all requests from admin.divinginasia.com to https://secured.onemedia.asia
  if (host.includes('admin.divinginasia.com')) {
    const pathname = req.url.split('?')[0];
    const search = req.url.includes('?') ? `?${req.url.split('?')[1]}` : '';
    res.writeHead(301, { Location: `https://secured.onemedia.asia${pathname}${search}` });
    res.end();
  } else {
    res.status(404).json({ error: 'Not found' });
  }
}
