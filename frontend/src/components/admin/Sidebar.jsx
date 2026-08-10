import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const navItems = [
  { to: '/admin', label: 'Kelola Katalog Kendaraan', end: true },
  { to: '/admin/harga-sewa', label: 'Kelola Tabel Harga Sewa', end: true },
  { to: '/admin/pengaturan', label: 'Pengaturan WhatsApp', end: true },
]

export default function Sidebar({ open, onClose }) {
  const { signOut } = useAuth()

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-brand-100 bg-white p-5 transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8">
          <p className="text-lg font-extrabold text-brand-700">Anantalia Rental</p>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink/40">
            Administrator Panel
          </p>
        </div>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-100 text-brand-800'
                    : 'text-ink/60 hover:bg-brand-50 hover:text-brand-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={signOut}
          className="mt-10 flex items-center gap-2 text-sm font-medium text-ink/50 hover:text-red-600"
        >
          Keluar / Logout
        </button>
      </aside>
    </>
  )
}
