export default function ContactSection() {
  return (
    <section id="lokasi" className="mx-auto max-w-6xl px-5 pb-16">
      <div className="overflow-hidden rounded-3xl border border-brand-100">
        <iframe
          title="Lokasi Anantalia Trans"
          src="https://www.google.com/maps?q=Pengasinan%2C%20Gunung%20Sindur%2C%20Bogor&output=embed"
          className="h-72 w-full border-0 sm:h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}
