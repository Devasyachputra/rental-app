const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../lib/prisma')

const TOKEN_EXPIRES_IN = '8h'

async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password wajib diisi.' })
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { email } })

    // Pesan generik supaya tidak bocorkan apakah email terdaftar atau tidak.
    if (!admin) {
      return res.status(401).json({ message: 'Email atau password salah.' })
    }

    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email atau password salah.' })
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    )

    return res.json({
      token,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    })
  } catch (err) {
    console.error('[auth.login]', err)
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' })
  }
}

// Dipakai frontend untuk validasi sesi saat reload halaman admin.
async function me(req, res) {
  return res.json({ admin: req.admin })
}

module.exports = { login, me }
