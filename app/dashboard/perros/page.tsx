"use client"

import PerrosList from '@/components/dashboard/perros/PerrosList'
import PerroForm from '@/components/dashboard/perros/PerroForm'
import PerroEdit from '@/components/dashboard/perros/PerroEdit'
import usePerros from '@/components/dashboard/perros/usePerros'
import { useState } from 'react'
import { Perro } from '@/components/dashboard/perros/PerrosList'

export default function Perros() {
  const { perros, isLoading, error, registerPerro, updatePerro, deletePerro } = usePerros()
  const [editingPerro, setEditingPerro] = useState<Perro | null>(null)

  const handleEdit = (perro: Perro) => {
    setEditingPerro(perro)
  }

  const handleCloseEdit = () => {
    setEditingPerro(null)
  }

  const handleUpdate = async (perro: Perro) => {
    await updatePerro(perro)
    handleCloseEdit()
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este perro?')) {
      await deletePerro(id)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">Error: {error}</span>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Perros</h1>
      
      <PerroForm onSubmit={registerPerro} />
      
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