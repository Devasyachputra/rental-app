import { useState } from 'react'
import { buildGenericWhatsAppLink } from '../../lib/whatsapp'

const links = [
  { href: '#beranda', label: 'Home' },
  { href: '#syarat', label: 'Syarat & Ketentuan' },
  { href: '#tentang', label: 'Tentang Kami' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar({ whatsappNumber }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#beranda" className="flex items-center gap-2">
          <span className="text-lg font-extrabold tracking-tight text-brand-700">
            ANANTALIA TRANS
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition hover:text-brand-700"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={buildGenericWhatsAppLink(whatsappNumber)}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 md:inline-block"
        >
          WhatsApp Admin
        </a>

        <button
          className="text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-brand-100 bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink/80"
              >
                {link.label}
              </a>
            ))}
            <a
              href={buildGenericWhatsAppLink(whatsappNumber)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-600 px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              WhatsApp Admin
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
