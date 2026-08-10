const prisma = require('../lib/prisma')

// GET /api/settings — publik, dipakai landing page untuk link WA
async function getSettings(req, res) {
  try {
    let settings = await prisma.settings.findUnique({ where: { id: 1 } })

    // Auto-provision baris settings pertama kali kalau belum ada.
    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: 1, whatsappNumber: '' },
      })
    }

    return res.json(settings)
  } catch (err) {
    console.error('[settings.get]', err)
    return res.status(500).json({ message: 'Gagal mengambil pengaturan.' })
  }
}

// PUT /api/settings — protected (admin)
async function updateSettings(req, res) {
  const { whatsappNumber } = req.body

  if (!whatsappNumber || !whatsappNumber.trim()) {
    return res.status(400).json({ message: 'Nomor WhatsApp wajib diisi.' })
  }

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '')
  if (cleanNumber.length < 9) {
    return res.status(400).json({ message: 'Format nomor WhatsApp tidak valid.' })
  }

  try {
    const settings = await prisma.settings.upsert({
      where: { id: 1 },
      update: { whatsappNumber: cleanNumber },
      create: { id: 1, whatsappNumber: cleanNumber },
    })
    return res.json(settings)
  } catch (err) {
    console.error('[settings.update]', err)
    return res.status(500).json({ message: 'Gagal memperbarui pengaturan.' })
  }
}

module.exports = { getSettings, updateSettings }
