const jwt = require('jsonwebtoken');

// Crash loudly at startup if JWT_SECRET is not set — no insecure fallback.
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('FATAL: JWT_SECRET environment variable is not set. Refusing to start.');
  process.exit(1);
}

function authenticateToken(req, res, next) {
  // Strict CSRF enforcement for mutating requests — completely stops cross-origin form abuse
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    if (req.headers['x-requested-with'] !== 'XMLHttpRequest') {
      return res.status(403).json({ error: 'CSRF denetimi başarısız.' });
    }
  }

  // Primary: httpOnly cookie. Fallback: Authorization Bearer header (for dev/API tools).
  let token = req.cookies?.token;

  if (!token) {
    const authHeader = req.headers['authorization'];
    token = authHeader && authHeader.split(' ')[1];
  }

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
