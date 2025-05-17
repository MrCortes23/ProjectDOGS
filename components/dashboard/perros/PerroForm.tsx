"use client"

import Cookies from 'js-cookie'

interface PerroFormData {
  nombre: string
  edad: string
  sexo: string
  raza: string
  foto: string
  id_cliente_fk: number
}

interface PerroFormProps {
  onSubmit: (formData: PerroFormData) => Promise<void>
}

export default function PerroForm({ onSubmit }: PerroFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Obtener el ID del cliente de la cookie
    const userCookie = Cookies.get('user')
    const userData = userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null
    
    if (!userData?.id) {
      console.error('No se encontró ID de cliente')
      return
    }

    const formData = {
      nombre: (e.currentTarget.nombre as HTMLInputElement).value,
      edad: (e.currentTarget.edad as HTMLInputElement).value,
      sexo: (e.currentTarget.sexo as HTMLSelectElement).value,
      raza: (e.currentTarget.raza as HTMLInputElement).value,
      foto: (e.currentTarget.foto as HTMLInputElement).value,
      id_cliente_fk: userData.id
    }
    
    await onSubmit(formData)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Registrar Nuevo Perro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Edad</label>
          <input
            type="text"
            id="edad"
            name="edad"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sexo</label>
          <select
            id="sexo"
            name="sexo"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccionar...</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Raza</label>
          <input
            type="text"
            id="raza"
            name="raza"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Foto (opcional)</label>
          <input
            type="text"
            id="foto"
            name="foto"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  )
}
