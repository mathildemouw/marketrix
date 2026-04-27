const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
const PASSWORD = process.env.AUTH_PASSWORD;

function login(req, res) {
  if (!PASSWORD) {
    return res.status(500).json({ error: 'AUTH_PASSWORD env var not set' });
  }
  const { password } = req.body;
  if (password !== PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  const token = jwt.sign({}, SECRET, { expiresIn: '30d' });
  res.json({ token });
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    jwt.verify(header.slice(7), SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { login, requireAuth };
