/**
 * Format angka ke Rupiah, mis. 1000000 -> "1.000.000"
 */
export function formatRupiah(value) {
  const number = Number(value) || 0
  return number.toLocaleString('id-ID')
}

/**
 * Bangun link WhatsApp dengan pesan otomatis untuk sebuah unit mobil.
 * @param {string} phoneNumber - nomor WA admin, format internasional tanpa '+' mis. "6281380333707"
 * @param {{ name: string, price_per_day: number }} car
 */
export function buildWhatsAppLink(phoneNumber, car) {
  const cleanNumber = (phoneNumber || '').replace(/[^0-9]/g, '')
  const message = `Halo Admin, saya ingin memesan unit ${car.name} dengan harga Rp ${formatRupiah(
    car.price_per_day
  )}/hari. Apakah unit ini tersedia?`
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
}

/**
 * Link WA generik (tanpa konteks mobil tertentu), dipakai di navbar/footer.
 */
export function buildGenericWhatsAppLink(phoneNumber, text = 'Halo Admin, saya ingin bertanya seputar sewa mobil.') {
  const cleanNumber = (phoneNumber || '').replace(/[^0-9]/g, '')
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`
}
