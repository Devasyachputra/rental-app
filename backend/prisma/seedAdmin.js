/**
 * Skrip sekali-jalan untuk membuat akun admin pertama.
 * Jalankan: npm run seed:admin -- admin@anantalia.id passwordAman123
 */
require('dotenv').config()
const bcrypt = require('bcryptjs')
const prisma = require('../src/lib/prisma')

async function main() {
  const [, , email, password, name] = process.argv

  if (!email || !password) {
    console.error('Pemakaian: npm run seed:admin -- <email> <password> [nama]')
    process.exit(1)
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { passwordHash, name: name || undefined },
    create: { email, passwordHash, name: name || 'Owner Anantalia' },
  })

  console.log(`✅ Admin siap dipakai: ${admin.email}`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
