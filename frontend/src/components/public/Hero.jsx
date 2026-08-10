export default function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden bg-mist px-5 pb-16 pt-14 text-center">
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
          Premium Auto Rent · Jabodetabek
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-5xl">
          Sewa Mobil Impianmu di Jabodetabek —{' '}
          <span className="text-brand-600">Cepat, Transparan, Siap Pakai</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm text-ink/60 sm:text-base">
          Nikmati pengalaman berkendara kelas eksekutif dengan armada terbaru dan layanan
          pelanggan 24 jam yang profesional.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="#legalitas"
            className="rounded-full border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-sm transition hover:border-brand-400"
          >
            Lihat Legalitas Perusahaan
          </a>
        </div>
      </div>
    </section>
  )
}
