const prisma = require('../lib/prisma')

// GET /api/price-rates — publik, dipakai landing page (tabel harga sewa lengkap)
async function getAllRates(req, res) {
  try {
    const rates = await prisma.priceRate.findMany({ orderBy: { createdAt: 'asc' } })
    return res.json(rates)
  } catch (err) {
    console.error('[priceRates.getAll]', err)
    return res.status(500).json({ message: 'Gagal mengambil data tabel harga sewa.' })
  }
}

function validateRatePayload(body, { partial = false } = {}) {
  const errors = []
  const numericFields = ['inCityHalfDay', 'inCityFullDay', 'outCityHalfDay', 'outCityFullDay']

  if (!partial || body.vehicleType !== undefined) {
    if (!body.vehicleType || !body.vehicleType.trim()) {
      errors.push('Tipe kendaraan wajib diisi.')
    }
  }

  numericFields.forEach((field) => {
    if (!partial || body[field] !== undefined) {
      if (body[field] === undefined || body[field] === '' || Number(body[field]) < 0) {
        errors.push('Semua kolom tarif harus diisi dengan angka.')
      }
    }
  })

  return errors
}

// POST /api/price-rates — protected (admin)
async function createRate(req, res) {
  const errors = validateRatePayload(req.body)
  if (errors.length) return res.status(400).json({ message: [...new Set(errors)].join(' ') })

  const { vehicleType, inCityHalfDay, inCityFullDay, outCityHalfDay, outCityFullDay } = req.body

  try {
    const rate = await prisma.priceRate.create({
      data: {
        vehicleType,
        inCityHalfDay: Number(inCityHalfDay),
        inCityFullDay: Number(inCityFullDay),
        outCityHalfDay: Number(outCityHalfDay),
        outCityFullDay: Number(outCityFullDay),
      },
    })
    return res.status(201).json(rate)
  } catch (err) {
    console.error('[priceRates.create]', err)
    return res.status(500).json({ message: 'Gagal menambahkan tipe kendaraan baru.' })
  }
}

// PUT /api/price-rates/:id — protected (admin)
async function updateRate(req, res) {
  const errors = validateRatePayload(req.body, { partial: true })
  if (errors.length) return res.status(400).json({ message: [...new Set(errors)].join(' ') })

  const { vehicleType, inCityHalfDay, inCityFullDay, outCityHalfDay, outCityFullDay } = req.body

  try {
    const rate = await prisma.priceRate.update({
      where: { id: req.params.id },
      data: {
        ...(vehicleType !== undefined && { vehicleType }),
        ...(inCityHalfDay !== undefined && { inCityHalfDay: Number(inCityHalfDay) }),
        ...(inCityFullDay !== undefined && { inCityFullDay: Number(inCityFullDay) }),
        ...(outCityHalfDay !== undefined && { outCityHalfDay: Number(outCityHalfDay) }),
        ...(outCityFullDay !== undefined && { outCityFullDay: Number(outCityFullDay) }),
      },
    })
    return res.json(rate)
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Baris tarif tidak ditemukan.' })
    }
    console.error('[priceRates.update]', err)
    return res.status(500).json({ message: 'Gagal memperbarui tabel harga sewa.' })
  }
}

// DELETE /api/price-rates/:id — protected (admin)
async function deleteRate(req, res) {
  try {
    await prisma.priceRate.delete({ where: { id: req.params.id } })
    return res.status(204).send()
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Baris tarif tidak ditemukan.' })
    }
    console.error('[priceRates.delete]', err)
    return res.status(500).json({ message: 'Gagal menghapus baris tarif.' })
  }
}

module.exports = { getAllRates, createRate, updateRate, deleteRate }
