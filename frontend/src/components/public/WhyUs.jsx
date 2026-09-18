const points = [
  {
    title: 'Antar Jemput',
    desc: 'Siap antar-jemput unit ke lokasi Anda di Jabodetabek.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h13l-3-3m3 3-3 3M17 5h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
    ),
  },
  {
    title: 'Tepat Waktu',
    desc: 'Menghargai waktu Anda dengan pelayanan on time.',
    icon: <><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 7v5l3 3" /></>,
  },
  {
    title: 'Berpengalaman',
    desc: 'Sopir handal dan berpengalaman di segala rute.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" />,
  },
  {
    title: 'Layanan 24/7',
    desc: 'Customer service siap melayani konsultasi kapan saja.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M18 10a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6ZM9 20a3 3 0 0 0 6 0" />,
  },
]

export default function WhyUs() {
  return (
    <section id="tentang" className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
          Kenapa Harus <span className="text-brand-600">Rental Mobil?</span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-ink/60">
          Kami mengedepankan kualitas armada dan kepuasan pelanggan sebagai prioritas utama kami.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {points.map((p) => (
          <div key={p.title} className="rounded-2xl border border-brand-100 bg-white p-5 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {p.icon}
              </svg>
            </div>
            <h3 className="text-sm font-bold text-ink">{p.title}</h3>
            <p className="mt-1 text-xs text-ink/55">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
