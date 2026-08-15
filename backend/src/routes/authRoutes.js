const express = require('express')
const { login, me } = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const { loginLimiter } = require('../middleware/rateLimiter')

const router = express.Router()

router.post('/login', loginLimiter, login)
router.get('/me', authMiddleware, me)

module.exports = router