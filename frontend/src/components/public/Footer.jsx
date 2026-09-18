export default function Footer({ whatsappNumber }) {
  return (
    <footer className="bg-brand-900 px-5 py-10 text-brand-50">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold">RENTAL MOBIL</p>
          <p className="mt-2 text-xs text-brand-100/70">
            Premium Auto Rent Services di Jabodetabek. Menyediakan berbagai pilihan armada
            terbaru untuk segala kebutuhan perjalanan Anda.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-brand-100">Alamat &amp; Lokasi</p>
          <p className="mt-2 text-xs text-brand-100/70">
            Taman Cendana Indah, Blok B No. 09, Pengasinan Gunung Sindur, Bogor.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-brand-100">Hubungi Kami</p>
          <p className="mt-2 text-xs text-brand-100/70">WhatsApp: {whatsappNumber || '-'}</p>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-5 text-center text-[11px] text-brand-100/50">
        © {new Date().getFullYear()} Rental Mobil &amp; Travel. Premium Auto Rent Services. All Rights Reserved.
      </p>
    </footer>
  )
}
