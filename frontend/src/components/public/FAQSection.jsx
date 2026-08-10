import { useState } from 'react'

const faqs = [
  {
    q: 'Bagaimana proses booking mobil di Anantalia Trans?',
    a: 'Pilih unit di katalog, klik tombol Booking via WhatsApp, dan tim kami akan mengonfirmasi ketersediaan serta detail sewa langsung melalui chat.',
  },
  {
    q: 'Area mana saja yang tercover layanan antar-jemput?',
    a: 'Kami melayani antar-jemput di seluruh wilayah Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi).',
  },
  {
    q: 'Apakah harga sudah termasuk BBM dan Tol?',
    a: 'Belum. Harga sewa mencakup unit dan driver, sedangkan BBM, tol, parkir, dan makan driver ditanggung terpisah oleh penyewa.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 pb-16">
      <h2 className="mb-6 text-center text-xl font-extrabold text-ink sm:text-2xl">
        Hal yang Sering Ditanyakan
      </h2>
      <div className="flex flex-col gap-3">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx
          return (
            <div key={item.q} className="overflow-hidden rounded-2xl border border-brand-100 bg-white">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-ink"
                aria-expanded={isOpen}
              >
                {item.q}
                <svg
                  className={`shrink-0 text-brand-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {isOpen && <p className="px-5 pb-4 text-sm text-ink/60">{item.a}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
