import { useMemo, useState } from 'react'
import { formatRupiah, buildGenericWhatsAppLink } from '../../lib/whatsapp'

const columns = [
  { key: 'in_city_half_day', label: 'Dalam Kota (12 Jam)' },
  { key: 'in_city_full_day', label: 'Dalam Kota (Full Day)' },
  { key: 'out_city_half_day', label: 'Luar Kota (12 Jam)' },
  { key: 'out_city_full_day', label: 'Luar Kota (Full Day)' },
]

export default function PriceTable({ rates, loading, whatsappNumber }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return rates
    const q = query.toLowerCase()
    return rates.filter((r) => r.vehicle_type.toLowerCase().includes(q))
  }, [rates, query])

  return (
    <section id="harga" className="mx-auto max-w-6xl px-5 pb-16">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Daftar Harga Sewa Lengkap</h2>
          <p className="mt-1 text-sm text-ink/60">Harga kompetitif dengan layanan terbaik di kelasnya.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari tipe kendaraan..."
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

      <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-brand-50 text-xs font-semibold uppercase tracking-wide text-brand-700">
              <tr>
                <th className="px-5 py-3.5">Type Kendaraan</th>
                {columns.map((col) => (
                  <th key={col.key} className="px-5 py-3.5">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {loading && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-ink/50">
                    Memuat tabel harga...
                  </td>
                </tr>
              )}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-ink/50">
                    Tidak ada tipe kendaraan yang cocok dengan pencarian "{query}".
                  </td>
                </tr>
              )}

              {filtered.map((rate) => (
                <tr key={rate.id}>
                  <td className="px-5 py-3.5 font-semibold text-ink">{rate.vehicle_type}</td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5 text-ink/70">
                      {formatRupiah(rate[col.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <a
          href={buildGenericWhatsAppLink(
            whatsappNumber,
            'Halo Admin, saya ingin tanya-tanya soal harga sewa mobil.'
          )}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Booking Ke Whatsapp
        </a>
      </div>
    </section>
  )
}
