import { buildWhatsAppLink, formatRupiah } from '../../lib/whatsapp'

export default function CarCard({ car, whatsappNumber }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition hover:shadow-soft">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-50">
        {car.photo_url ? (
          <img
            src={car.photo_url}
            alt={car.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-brand-300">
            Tidak ada foto
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-base font-bold text-ink">{car.name}</h3>
          <p className="text-xs uppercase tracking-wide text-ink/40">{car.brand}</p>
        </div>

        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/60">
          <li>{car.transmission}</li>
          <li>{car.seats} Kursi</li>
        </ul>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="text-[11px] text-ink/40">Harga Sewa / Hari</p>
            <p className="text-lg font-extrabold text-brand-700">
              Rp {formatRupiah(car.price_per_day)}
            </p>
          </div>
        </div>

        <a
          href={buildWhatsAppLink(whatsappNumber, car)}
          target="_blank"
          rel="noreferrer"
          className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Booking via WhatsApp
        </a>
      </div>
    </article>
  )
}
