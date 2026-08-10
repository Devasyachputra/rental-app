const express = require('express')
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require('../controllers/carsController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// Publik — dipakai landing page
router.get('/', getAllCars)
router.get('/:id', getCarById)

// Protected — hanya admin yang sudah login
router.post('/', authMiddleware, createCar)
router.put('/:id', authMiddleware, updateCar)
router.delete('/:id', authMiddleware, deleteCar)

module.exports = router
