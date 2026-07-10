export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Simple hardcoded admin credentials
  if (username === 'admin' && password === 'admin') {
    res.json({ success: true, token: 'admin-session-token' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}