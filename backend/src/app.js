const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authRoutes = require('./routes/authRoutes')
const carsRoutes = require('./routes/carsRoutes')
const settingsRoutes = require('./routes/settingsRoutes')
const priceRatesRoutes = require('./routes/priceRatesRoutes')
const { apiLimiter } = require('./middleware/rateLimiter')

const app = express()

app.use(helmet())

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',')
app.use(
  cors({
    origin: allowedOrigins,
  })
)

app.use(express.json())

app.use('/api', apiLimiter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'anantalia-rental-api' })
})

app.use('/api/auth', authRoutes)
app.use('/api/cars', carsRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/price-rates', priceRatesRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan.' })
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[unhandled]', err)
  res.status(500).json({ message: 'Terjadi kesalahan pada server.' })
})

module.exports = app