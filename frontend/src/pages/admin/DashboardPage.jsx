import { useState } from 'react'
import { useCars } from '../../hooks/useCars.js'
import { formatRupiah } from '../../lib/whatsapp'
import CarFormModal from '../../components/admin/CarFormModal.jsx'
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx'

export default function DashboardPage() {
  const { cars, loading, createCar, updateCar, deleteCar } = useCars()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [deletingCar, setDeletingCar] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [banner, setBanner] = useState('')

  function openCreate() {
    setEditingCar(null)
    setModalOpen(true)
  }

  function openEdit(car) {
    setEditingCar(car)
    setModalOpen(true)
  }

  async function handleSubmit(values) {
    if (editingCar) {
      await updateCar(editingCar.id, values)
      setBanner('Unit berhasil diperbarui dan dipublis ke website.')
    } else {
      await createCar(values)
      setBanner('Unit baru berhasil ditambahkan ke katalog.')
    }
    setTimeout(() => setBanner(''), 3500)
  }

  async function handleDelete() {
    if (!deletingCar) return
    setDeleting(true)
    try {
      await deleteCar(deletingCar.id)
      setDeletingCar(null)
    } catch (err) {
      setBanner(err.response?.data?.message || 'Gagal menghapus unit.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-ink sm:text-2xl">Kelola Katalog Kendaraan</h1>
          <p className="mt-1 text-sm text-ink/50">
            Kelola daftar mobil, foto, dan harga sewa yang tampil di website.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          + Tambah Armada Baru
        </button>
      </div>

      {banner && (
        <div className="mb-5 rounded-xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800">
          {banner}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-brand-50 text-xs font-semibold uppercase tracking-wide text-brand-700">
              <tr>
                <th className="px-5 py-3">Unit</th>
                <th className="px-5 py-3">Transmisi</th>
                <th className="px-5 py-3">Kursi</th>
                <th className="px-5 py-3">Harga / Hari</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {loading && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-ink/50">
                    Memuat data...
                  </td>
                </tr>
              )}

              {!loading && cars.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-ink/50">
                    Belum ada armada terdaftar. Klik "Tambah Armada Baru" untuk mulai.
                  </td>
                </tr>
              )}

              {cars.map((car) => (
                <tr key={car.id}>
                  <td className="flex items-center gap-3 px-5 py-3">
                    <div className="h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-brand-50">
                      {car.photo_url && (
                        <img src={car.photo_url} alt={car.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-ink">{car.name}</p>
                      <p className="text-xs text-ink/40">{car.brand}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-ink/70">{car.transmission}</td>
                  <td className="px-5 py-3 text-ink/70">{car.seats}</td>
                  <td className="px-5 py-3 font-semibold text-ink">Rp {formatRupiah(car.price_per_day)}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(car)}
                        className="rounded-lg border border-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingCar(car)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <CarFormModal
          initialData={editingCar}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      {deletingCar && (
        <ConfirmDialog
          title="Hapus armada ini?"
          message={`"${deletingCar.name}" akan dihapus permanen dari katalog dan website.`}
          loading={deleting}
          onCancel={() => setDeletingCar(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  )
}
