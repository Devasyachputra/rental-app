const jwt = require('jsonwebtoken')

/**
 * Middleware proteksi route admin.
 * Mengharapkan header: Authorization: Bearer <token>
 * Jika valid, payload token (id, email) disisipkan ke req.admin.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      message: 'Akses ditolak. Token autentikasi tidak ditemukan.',
    })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = payload
    next()
  } catch (err) {
    const message =
      err.name === 'TokenExpiredError'
        ? 'Sesi login sudah berakhir, silakan login ulang.'
        : 'Token tidak valid.'
    return res.status(401).json({ message })
  }
}

module.exports = authMiddleware
