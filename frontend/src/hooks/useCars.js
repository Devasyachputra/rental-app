import { useCallback, useEffect, useState } from 'react'
import api from '../services/api.js'

// Backend (Prisma) mengembalikan field camelCase (pricePerDay, photoUrl, createdAt).
// Komponen UI di project ini ditulis dengan field snake_case (price_per_day, photo_url, dst),
// jadi kita mapping di sini supaya komponen lain tidak perlu diubah satu-satu.
function toClientShape(car) {
  return {
    id: car.id,
    name: car.name,
    brand: car.brand,
    transmission: car.transmission,
    seats: car.seats,
    price_per_day: car.pricePerDay,
    photo_url: car.photoUrl,
    created_at: car.createdAt,
  }
}

function toApiShape(payload) {
  return {
    name: payload.name,
    brand: payload.brand,
    transmission: payload.transmission,
    seats: payload.seats,
    pricePerDay: payload.price_per_day,
    photoUrl: payload.photo_url,
  }
}

export function useCars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCars = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/cars')
      setCars(data.map(toClientShape))
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat data armada.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCars()
  }, [fetchCars])

  async function createCar(payload) {
    const { data } = await api.post('/cars', toApiShape(payload))
    await fetchCars()
    return toClientShape(data)
  }

  async function updateCar(id, payload) {
    const { data } = await api.put(`/cars/${id}`, toApiShape(payload))
    await fetchCars()
    return toClientShape(data)
  }

  async function deleteCar(id) {
    await api.delete(`/cars/${id}`)
    await fetchCars()
  }

  return { cars, loading, error, refetch: fetchCars, createCar, updateCar, deleteCar }
}
