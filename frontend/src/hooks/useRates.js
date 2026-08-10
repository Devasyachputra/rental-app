import { useCallback, useEffect, useState } from 'react'
import api from '../services/api.js'

function toClientShape(rate) {
  return {
    id: rate.id,
    vehicle_type: rate.vehicleType,
    in_city_half_day: rate.inCityHalfDay,
    in_city_full_day: rate.inCityFullDay,
    out_city_half_day: rate.outCityHalfDay,
    out_city_full_day: rate.outCityFullDay,
  }
}

function toApiShape(payload) {
  return {
    vehicleType: payload.vehicle_type,
    inCityHalfDay: payload.in_city_half_day,
    inCityFullDay: payload.in_city_full_day,
    outCityHalfDay: payload.out_city_half_day,
    outCityFullDay: payload.out_city_full_day,
  }
}

export function useRates() {
  const [rates, setRates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRates = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/price-rates')
      setRates(data.map(toClientShape))
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat tabel harga sewa.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRates()
  }, [fetchRates])

  async function createRate(payload) {
    const { data } = await api.post('/price-rates', toApiShape(payload))
    return toClientShape(data)
  }

  async function updateRate(id, payload) {
    const { data } = await api.put(`/price-rates/${id}`, toApiShape(payload))
    return toClientShape(data)
  }

  async function deleteRate(id) {
    await api.delete(`/price-rates/${id}`)
  }

  return { rates, loading, error, refetch: fetchRates, createRate, updateRate, deleteRate }
}
