/**
 * Skrip untuk mengisi data armada contoh.
 * Jalankan: npm run seed:cars
 * Aman dijalankan berkali-kali — pakai upsert berdasarkan nama unit.
 */
require('dotenv').config()
const prisma = require('../src/lib/prisma')

const cars = [
  {
    name: 'Toyota Avanza 2024',
    brand: 'Toyota',
    transmission: 'Matic',
    seats: 7,
    pricePerDay: 450000,
    photoUrl: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Toyota Innova Zenix Hybrid 2024',
    brand: 'Toyota',
    transmission: 'Matic',
    seats: 7,
    pricePerDay: 1000000,
    photoUrl: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Honda Brio Satya 2023',
    brand: 'Honda',
    transmission: 'Manual',
    seats: 5,
    pricePerDay: 350000,
    photoUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Toyota Fortuner VRZ',
    brand: 'Toyota',
    transmission: 'Matic',
    seats: 7,
    pricePerDay: 1400000,
    photoUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Toyota Alphard 2025',
    brand: 'Toyota',
    transmission: 'Matic',
    seats: 6,
    pricePerDay: 5500000,
    photoUrl: 'https://images.unsplash.com/photo-1617654112368-307921291f42?auto=format&fit=crop&w=800&q=80',
  },
]

async function main() {
  for (const car of cars) {
    const existing = await prisma.car.findFirst({ where: { name: car.name } })
    if (existing) {
      await prisma.car.update({ where: { id: existing.id }, data: car })
    } else {
      await prisma.car.create({ data: car })
    }
    console.log(`✅ ${car.name}`)
  }
  console.log(`\nSelesai. Total ${cars.length} unit armada siap tampil di katalog.`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
