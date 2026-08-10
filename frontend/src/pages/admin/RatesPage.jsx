import { useEffect, useState } from 'react'
import { useRates } from '../../hooks/useRates.js'
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx'

const columns = [
  { key: 'in_city_half_day', label: 'Dalam Kota (12 Jam)' },
  { key: 'in_city_full_day', label: 'Dalam Kota (Full)' },
  { key: 'out_city_half_day', label: 'Luar Kota (12 Jam)' },
  { key: 'out_city_full_day', label: 'Luar Kota (Full)' },
]

let tempIdCounter = 0
function makeTempId() {
  tempIdCounter += 1
  return `temp-${tempIdCounter}`
}

function emptyRow() {
  return {
    id: makeTempId(),
    isNew: true,
    vehicle_type: '',
    in_city_half_day: '',
    in_city_full_day: '',
    out_city_half_day: '',
    out_city_full_day: '',
  }
}

export default function RatesPage() {
  const { rates, loading, createRate, updateRate, deleteRate } = useRates()
  const [rows, setRows] = useState([])
  const [saving, setSaving] = useState(false)
  const [banner, setBanner] = useState('')
  const [error, setError] = useState('')
  const [deletingRow, setDeletingRow] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // Sinkronkan state lokal (editable) setiap kali data dari server berubah,
  // tapi jangan timpa baris baru yang belum disimpan (isNew).
  useEffect(() => {
    setRows((prev) => {
      const pendingNewRows = prev.filter((r) => r.isNew)
      return [...rates.map((r) => ({ ...r, isNew: false })), ...pendingNewRows]
    })
  }, [rates])

  function handleFieldChange(rowId, field, value) {
    setRows((prev) => prev.map((r) => (r.id === rowId ? { ...r, [field]: value } : r)))
  }

  function handleAddRow() {
    setRows((prev) => [...prev, emptyRow()])
  }

  async function handleSaveAll() {
    setError('')
    setSaving(true)
    try {
      for (const row of rows) {
        if (!row.vehicle_type?.trim()) continue // lewati baris kosong yang belum diisi

        const payload = {
          vehicle_type: row.vehicle_type,
          in_city_half_day: Number(row.in_city_half_day) || 0,
          in_city_full_day: Number(row.in_city_full_day) || 0,
          out_city_half_day: Number(row.out_city_half_day) || 0,
          out_city_full_day: Number(row.out_city_full_day) || 0,
        }

        if (row.isNew) {
          await createRate(payload)
        } else {
          await updateRate(row.id, payload)
        }
      }
      setBanner('Tabel harga sewa berhasil diperbarui dan dipublis ke website.')
      setTimeout(() => setBanner(''), 3500)
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan tabel harga sewa.')
    } finally {
      setSaving(false)
    }
  }

  async function handleConfirmDelete() {
    if (!deletingRow) return
    if (deletingRow.isNew) {
      setRows((prev) => prev.filter((r) => r.id !== deletingRow.id))
      setDeletingRow(null)
      return
    }
    setDeleting(true)
    try {
      await deleteRate(deletingRow.id)
      setRows((prev) => prev.filter((r) => r.id !== deletingRow.id))
      setDeletingRow(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus baris tarif.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-ink sm:text-2xl">Kelola Tabel Harga Sewa</h1>
          <p className="mt-1 text-sm text-ink/50">
            Konfigurasikan tarif sewa harian dan luar kota untuk armada Anantalia.
          </p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {saving ? 'Menyimpan...' : 'Update Tabel di Website'}
        </button>
      </div>

      {banner && (
        <div className="mb-5 rounded-xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800">
          {banner}
        </div>
      )}
      {error && (
        <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-brand-100 bg-white p-5 sm:p-6">
        {loading ? (
          <p className="py-8 text-center text-sm text-ink/50">Memuat tabel harga...</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                  <tr>
                    <th className="px-3 py-2.5">Tipe Kendaraan</th>
                    {columns.map((col) => (
                      <th key={col.key} className="px-3 py-2.5">
                        {col.label}
                      </th>
                    ))}
                    <th className="px-3 py-2.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-50">
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="px-3 py-2.5">
                        <input
                          value={row.vehicle_type}
                          onChange={(e) => handleFieldChange(row.id, 'vehicle_type', e.target.value)}
                          placeholder="Contoh: Toyota Avanza / Xenia"
                          className="input"
                        />
                      </td>
                      {columns.map((col) => (
                        <td key={col.key} className="px-3 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-ink/40">Rp</span>
                            <input
                              type="number"
                              min={0}
                              value={row[col.key]}
                              onChange={(e) => handleFieldChange(row.id, col.key, e.target.value)}
                              className="input"
                            />
                          </div>
                        </td>
                      ))}
                      <td className="px-3 py-2.5 text-right">
                        <button
                          onClick={() => setDeletingRow(row)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={handleAddRow}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-200 py-3 text-sm font-semibold text-brand-600 hover:border-brand-400 hover:bg-brand-50"
            >
              + Tambah Tipe Kendaraan Baru
            </button>
          </>
        )}
      </div>

      {deletingRow && (
        <ConfirmDialog
          title="Hapus tipe kendaraan ini?"
          message={`"${deletingRow.vehicle_type || 'Baris ini'}" akan dihapus dari tabel harga sewa di website.`}
          loading={deleting}
          onCancel={() => setDeletingRow(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
