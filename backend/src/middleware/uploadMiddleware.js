const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadDir = path.join(__dirname, '..', '..', 'uploads')

// Pastikan folder uploads/ ada (aman dijalankan berkali-kali)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    // Nama file unik: timestamp-random.ext, supaya tidak bentrok antar upload
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`)
  },
})

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']

function fileFilter(req, file, cb) {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Format file harus JPG, PNG, atau WEBP.'))
  }
  cb(null, true)
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // maksimal 2MB, sesuai spesifikasi admin panel
})

/**
 * Wrapper di sekitar multer supaya error (ukuran/format file salah) dibalas
 * sebagai JSON yang rapi, bukan halaman error HTML default Express.
 */
function uploadSinglePhoto(req, res, next) {
  upload.single('photo')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'Ukuran file maksimal 2MB.' })
      }
      return res.status(400).json({ message: err.message })
    }
    if (err) {
      return res.status(400).json({ message: err.message })
    }
    next()
  })
}

module.exports = { uploadSinglePhoto }
