import { useCallback, useEffect, useState } from 'react'
import api from '../services/api.js'

function toClientShape(settings) {
  return {
    id: settings.id,
    whatsapp_number: settings.whatsappNumber,
    updated_at: settings.updatedAt,
  }
}

export function useSettings() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSettings = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/settings')
      setSettings(toClientShape(data))
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat pengaturan.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  async function updateWhatsappNumber(newNumber) {
    const { data } = await api.put('/settings', { whatsappNumber: newNumber })
    setSettings(toClientShape(data))
    return data
  }

  return { settings, loading, error, updateWhatsappNumber, refetch: fetchSettings }
}
