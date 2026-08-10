const prisma = require('../lib/prisma')

// GET /api/cars — publik, dipakai landing page untuk render katalog
async function getAllCars(req, res) {
  try {
    const cars = await prisma.car.findMany({ orderBy: { createdAt: 'desc' } })
    return res.json(cars)
  } catch (err) {
    console.error('[cars.getAll]', err)
    return res.status(500).json({ message: 'Gagal mengambil data armada.' })
  }
}

// GET /api/cars/:id — publik
async function getCarById(req, res) {
  try {
    const car = await prisma.car.findUnique({ where: { id: req.params.id } })
    if (!car) return res.status(404).json({ message: 'Unit tidak ditemukan.' })
    return res.json(car)
  } catch (err) {
    console.error('[cars.getById]', err)
    return res.status(500).json({ message: 'Gagal mengambil data armada.' })
  }
}

function validateCarPayload(body, { partial = false } = {}) {
  const errors = []
  if (!partial || body.name !== undefined) {
    if (!body.name || !body.name.trim()) errors.push('Nama kendaraan wajib diisi.')
  }
  if (!partial || body.pricePerDay !== undefined) {
    if (body.pricePerDay === undefined || Number(body.pricePerDay) <= 0) {
      errors.push('Harga sewa per hari harus lebih dari 0.')
    }
  }
  if (body.transmission && !['Manual', 'Matic'].includes(body.transmission)) {
    errors.push('Transmisi harus "Manual" atau "Matic".')
  }
  return errors
}

// POST /api/cars — protected (admin)
async function createCar(req, res) {
  const errors = validateCarPayload(req.body)
  if (errors.length) return res.status(400).json({ message: errors.join(' ') })

  const { name, brand, transmission, seats, pricePerDay, photoUrl } = req.body

  try {
    const car = await prisma.car.create({
      data: {
        name,
        brand,
        transmission: transmission || 'Matic',
        seats: seats ? Number(seats) : 5,
        pricePerDay: Number(pricePerDay),
        photoUrl,
      },
    })
    return res.status(201).json(car)
  } catch (err) {
    console.error('[cars.create]', err)
    return res.status(500).json({ message: 'Gagal menambahkan armada baru.' })
  }
}

// PUT /api/cars/:id — protected (admin)
async function updateCar(req, res) {
  const errors = validateCarPayload(req.body, { partial: true })
  if (errors.length) return res.status(400).json({ message: errors.join(' ') })

  const { name, brand, transmission, seats, pricePerDay, photoUrl } = req.body

  try {
    const car = await prisma.car.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(brand !== undefined && { brand }),
        ...(transmission !== undefined && { transmission }),
        ...(seats !== undefined && { seats: Number(seats) }),
        ...(pricePerDay !== undefined && { pricePerDay: Number(pricePerDay) }),
        ...(photoUrl !== undefined && { photoUrl }),
      },
    })
    return res.json(car)
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Unit tidak ditemukan.' })
    }
    console.error('[cars.update]', err)
    return res.status(500).json({ message: 'Gagal memperbarui data armada.' })
  }
}

// DELETE /api/cars/:id — protected (admin)
async function deleteCar(req, res) {
  try {
    await prisma.car.delete({ where: { id: req.params.id } })
    return res.status(204).send()
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Unit tidak ditemukan.' })
    }
    console.error('[cars.delete]', err)
    return res.status(500).json({ message: 'Gagal menghapus armada.' })
  }
}

module.exports = { getAllCars, getCarById, createCar, updateCar, deleteCar }
