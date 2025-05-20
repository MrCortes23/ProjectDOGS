"use client"

import PerrosList from '@/components/dashboard/perros/PerrosList'
import PerroForm from '@/components/dashboard/perros/PerroForm'
import PerroEdit from '@/components/dashboard/perros/PerroEdit'
import usePerros from '@/components/dashboard/perros/usePerros'
import { useState } from 'react'
import { Perro } from '@/components/dashboard/perros/types'

export default function Perros() {
  const { perros, isLoading, error, registerPerro, updatePerro, deletePerro, razas } = usePerros()
  const [editingPerro, setEditingPerro] = useState<Perro | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  // Manejo de errores
  const handleError = (err: unknown) => {
    console.error('Error:', err)
    setDeleteError(err instanceof Error ? err.message : 'Error desconocido')
  }

  const handleEdit = (perro: Perro) => {
    setEditingPerro(perro)
  }

  const handleCloseEdit = () => {
    setEditingPerro(null)
  }

  const handleUpdate = async (perro: Perro) => {
    try {
      await updatePerro(perro)
      handleCloseEdit()
    } catch (err) {
      handleError(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este perro?')) {
      try {
        await deletePerro(id)
      } catch (err) {
        handleError(err)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || deleteError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 p-4 rounded">
          {error || deleteError}
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Mis Perros</h1>
      
      <PerroForm onSubmit={registerPerro} razas={razas} />
      
      <PerrosList 
        perros={perros} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {editingPerro && (
        <PerroEdit 
          perro={editingPerro} 
          onClose={handleCloseEdit} 
          onUpdate={handleUpdate} 
        />
      )}
    </div>
  )
}