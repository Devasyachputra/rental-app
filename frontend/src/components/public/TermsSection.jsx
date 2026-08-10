const terms = [
  'Paket sewa include mobil + driver selama 12-24 jam. Biaya belum termasuk BBM, Tol, Parkir, dan Makan Driver.',
  'Pemesanan luar kota dikenakan biaya tambahan sesuai rute.',
  'Overtime dikenakan biaya 10% per jam dari harga sewa.',
  'Tarif tidak berlaku untuk High Season (Lebaran/Libur Nasional).',
  'Konfirmasi pemesanan maksimal 24 jam sebelumnya.',
]

export default function TermsSection() {
  return (
    <section id="syarat" className="mx-auto max-w-4xl px-5 pb-16">
      <div className="rounded-3xl border border-brand-100 bg-white p-8">
        <h2 className="text-center text-xl font-extrabold text-ink sm:text-2xl">
          Syarat &amp; Ketentuan Penyewaan
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {terms.map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm text-ink/70">
              <svg
                className="mt-0.5 shrink-0 text-brand-500"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
              </svg>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
