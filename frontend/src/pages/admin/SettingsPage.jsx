import { useEffect, useState } from 'react'
import { useSettings } from '../../hooks/useSettings.js'

export default function SettingsPage() {
  const { settings, loading, updateWhatsappNumber } = useSettings()
  const [number, setNumber] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (settings) setNumber(settings.whatsapp_number || '')
  }, [settings])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    setSaving(true)
    try {
      await updateWhatsappNumber(number)
      setMessage('Nomor WhatsApp berhasil diperbarui dan langsung aktif di website.')
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan nomor WhatsApp.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="text-xl font-extrabold text-ink sm:text-2xl">Pengaturan WhatsApp</h1>
      <p className="mt-1 text-sm text-ink/50">
        Nomor ini menjadi tujuan semua tombol "Booking via WhatsApp" di landing page.
      </p>

      <div className="mt-6 max-w-md rounded-2xl border border-brand-100 bg-white p-6">
        {loading ? (
          <p className="text-sm text-ink/50">Memuat pengaturan...</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-ink/70">
                Nomor WhatsApp Aktif
              </span>
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="6281380333707"
                className="input"
              />
              <span className="mt-1.5 block text-[11px] text-ink/40">
                Gunakan format internasional tanpa tanda "+", contoh: 6281380333707
              </span>
            </label>

            {error && <p className="text-xs font-medium text-red-600">{error}</p>}
            {message && <p className="text-xs font-medium text-brand-700">{message}</p>}

            <button
              type="submit"
              disabled={saving}
              className="mt-1 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
