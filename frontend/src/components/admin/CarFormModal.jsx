import { useEffect, useState } from 'react'

const emptyForm = {
  name: '',
  brand: '',
  transmission: 'Matic',
  seats: 5,
  price_per_day: '',
  photo_url: '',
}

export default function CarFormModal({ initialData, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name ?? '',
        brand: initialData.brand ?? '',
        transmission: initialData.transmission ?? 'Matic',
        seats: initialData.seats ?? 5,
        price_per_day: initialData.price_per_day ?? '',
        photo_url: initialData.photo_url ?? '',
      })
    } else {
      setForm(emptyForm)
    }
  }, [initialData])

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.name || !form.price_per_day) {
      setError('Nama kendaraan dan harga sewa wajib diisi.')
      return
    }
    setSaving(true)
    try {
      await onSubmit({
        ...form,
        seats: Number(form.seats),
        price_per_day: Number(form.price_per_day),
      })
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan data kendaraan.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-soft">
        <h2 className="text-lg font-extrabold text-ink">
          {initialData ? 'Edit Kendaraan' : 'Tambah Armada Baru'}
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <Field label="Nama Kendaraan">
            <input
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Contoh: Toyota Innova Zenix Hybrid 2024"
              className="input"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Merk">
              <input
                value={form.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
                placeholder="Toyota"
                className="input"
              />
            </Field>
            <Field label="Transmisi">
              <select
                value={form.transmission}
                onChange={(e) => handleChange('transmission', e.target.value)}
                className="input"
              >
                <option>Matic</option>
                <option>Manual</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Kapasitas Penumpang">
              <input
                type="number"
                min={1}
                value={form.seats}
                onChange={(e) => handleChange('seats', e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Harga Sewa (per hari)">
              <input
                type="number"
                min={0}
                value={form.price_per_day}
                onChange={(e) => handleChange('price_per_day', e.target.value)}
                placeholder="1000000"
                className="input"
              />
            </Field>
          </div>

          <Field label="URL Foto Mobil">
            <input
              value={form.photo_url}
              onChange={(e) => handleChange('photo_url', e.target.value)}
              placeholder="https://..."
              className="input"
            />
          </Field>

          {error && <p className="text-xs font-medium text-red-600">{error}</p>}

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-brand-200 py-2.5 text-sm font-semibold text-ink/70"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {saving ? 'Menyimpan...' : 'Simpan & Publis ke Web'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink/70">{label}</span>
      {children}
    </label>
  )
}
