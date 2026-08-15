// POST /api/uploads/photo — protected (admin). Dipanggil dari CarFormModal saat admin
// pilih/drop file foto. Body harus multipart/form-data dengan field "photo".
function uploadPhoto(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'File foto wajib diupload.' })
  }

  // Bangun URL publik ke file statis (di-serve lewat app.use('/uploads', express.static(...)))
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

  return res.status(201).json({
    url: fileUrl,
    filename: req.file.filename,
  })
}

module.exports = { uploadPhoto }
