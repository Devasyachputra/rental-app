import { useMemo, useState } from 'react'
import CarCard from './CarCard.jsx'

export default function CatalogSection({ cars, loading, whatsappNumber }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return cars
    const q = query.toLowerCase()
    return cars.filter(
      (c) => c.name.toLowerCase().includes(q) || c.brand?.toLowerCase().includes(q)
    )
  }, [cars, query])

  return (
    <section id="katalog" className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Katalog Seluruh Kendaraan</h2>
          <p className="mt-1 text-sm text-ink/60">
            Pilihan armada terbaik untuk kebutuhan bisnis atau keluarga Anda.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama mobil..."
            className="w-full rounded-full border border-brand-200 bg-white py-2.5 pl-4 pr-10 text-sm outline-none focus:border-brand-500"
          />
          <svg
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-400"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="m20 20-3.5-3.5" />
          </svg>
        </div>
      </div>

      {loading && <p className="text-sm text-ink/50">Memuat katalog...</p>}

      {!loading && filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-brand-200 bg-white py-14 text-center text-sm text-ink/50">
          Tidak ada mobil yang cocok dengan pencarian "{query}".
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((car) => (
          <CarCard key={car.id} car={car} whatsappNumber={whatsappNumber} />
        ))}
      </div>
    </section>
  )
}
