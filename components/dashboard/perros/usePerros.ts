"use client"

import { useState, useEffect } from 'react'
import { Perro } from './PerrosList'

interface UsePerrosReturn {
  perros: Perro[]
  isLoading: boolean
  error: string | null
  registerPerro: (data: Partial<Perro>) => Promise<void>
  updatePerro: (perro: Perro) => Promise<void>
  deletePerro: (id: number) => Promise<void>
}

export default function usePerros(): UsePerrosReturn {
  const [perros, setPerros] = useState<Perro[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPerros = async () => {
    try {
      const response = await fetch('/api/dashboard/perros')
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Error al obtener los perros')
      }

      setPerros(data.perros)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  const registerPerro = async (data: Partial<Perro>) => {
    try {
      const response = await fetch('/api/dashboard/perros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Error al registrar el perro')
      }

      setPerros(prev => [...prev, result.perro])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar el perro')
    }
  }

  const updatePerro = async (perro: Perro) => {
    try {
      const response = await fetch('/api/dashboard/perros', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(perro),
      })
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Error al actualizar el perro')
      }

      setPerros(prev => 
        prev.map(p => p.id_perro_pk === perro.id_perro_pk ? result.perro : p)
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el perro')
    }
  }

  const deletePerro = async (id: number) => {
    try {
      const response = await fetch(`/api/dashboard/perros?id_perro_pk=${id}`, {
        method: 'DELETE',
      })
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Error al eliminar el perro')
      }

      setPerros(prev => prev.filter(p => p.id_perro_pk !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el perro')
    }
  }

  useEffect(() => {
    fetchPerros()
  }, [])

  return {
    perros,
    isLoading,
    error,
    registerPerro,
    updatePerro,
    deletePerro,
  }
}