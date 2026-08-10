/**
 * Skrip untuk mengisi data "Daftar Harga Sewa Lengkap" contoh.
 * Jalankan: npm run seed:rates
 * Aman dijalankan berkali-kali — upsert berdasarkan vehicleType.
 */
require('dotenv').config()
const prisma = require('../src/lib/prisma')

const rates = [
  { vehicleType: 'Ayla / Agya', inCityHalfDay: 350000, inCityFullDay: 450000, outCityHalfDay: 550000, outCityFullDay: 700000 },
  { vehicleType: 'Mitsubishi Xpander', inCityHalfDay: 500000, inCityFullDay: 650000, outCityHalfDay: 750000, outCityFullDay: 850000 },
  { vehicleType: 'Fortuner VRZ', inCityHalfDay: 1650000, inCityFullDay: 1850000, outCityHalfDay: 2000000, outCityFullDay: 2250000 },
  { vehicleType: 'Toyota Alphard 2025', inCityHalfDay: 5000000, inCityFullDay: 5500000, outCityHalfDay: 5750000, outCityFullDay: 6500000 },
  { vehicleType: 'Hiace Premio (14 Seater)', inCityHalfDay: 2400000, inCityFullDay: 2650000, outCityHalfDay: 2650000, outCityFullDay: 2850000 },
]

async function main() {
  for (const rate of rates) {
    const existing = await prisma.priceRate.findFirst({ where: { vehicleType: rate.vehicleType } })
    if (existing) {
      await prisma.priceRate.update({ where: { id: existing.id }, data: rate })
    } else {
      await prisma.priceRate.create({ data: rate })
    }
    console.log(`✅ ${rate.vehicleType}`)
  }
  console.log(`\nSelesai. Total ${rates.length} baris tarif siap tampil di tabel harga sewa.`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
