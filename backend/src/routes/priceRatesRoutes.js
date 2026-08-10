const express = require('express')
const { getAllRates, createRate, updateRate, deleteRate } = require('../controllers/priceRatesController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// Publik — dipakai landing page
router.get('/', getAllRates)

// Protected — hanya admin yang sudah login
router.post('/', authMiddleware, createRate)
router.put('/:id', authMiddleware, updateRate)
router.delete('/:id', authMiddleware, deleteRate)

module.exports = router
