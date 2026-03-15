const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'cumhuriyet-apartmani-secret-2024';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Oturum açmanız gerekiyor.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Geçersiz veya süresi dolmuş oturum.' });
    }
    req.user = user;
    next();
  });
}

function authorizeRole(roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Yetkisiz erişim.' });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRole, JWT_SECRET };
