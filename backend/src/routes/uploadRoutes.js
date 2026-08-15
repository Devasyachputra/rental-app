const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { uploadSinglePhoto } = require('../middleware/uploadMiddleware')
const { uploadPhoto } = require('../controllers/uploadController')

const router = express.Router()

// Protected — hanya admin yang sudah login yang boleh upload
router.post('/photo', authMiddleware, uploadSinglePhoto, uploadPhoto)

module.exports = router
