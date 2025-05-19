"use client"

import React from 'react'

import { Raza } from './types'

interface PerroFormProps {
  onSubmit: (formData: FormData) => Promise<void>
  razas: Raza[]
}

export default function PerroForm({ onSubmit, razas }: PerroFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Obtener los valores del formulario
    const nombre = e.currentTarget.nombre.value
    const edad = e.currentTarget.edad.value
    const sexo = e.currentTarget.sexo.value
    const id_raza_fk = e.currentTarget.id_raza_fk.value
    const foto = e.currentTarget.foto.files?.[0]

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !edad || !sexo || !id_raza_fk) {
      console.error('Faltan campos requeridos')
      return
    }

    // Convertir edad a número
    const edadNum = parseInt(edad)
    if (isNaN(edadNum)) {
      console.error('Edad inválida')
      return
    }

    // Convertir ID de raza a número
    const idRazaNum = parseInt(id_raza_fk)
    if (isNaN(idRazaNum)) {
      console.error('ID de raza inválido')
      return
    }

    // Crear un nuevo FormData con los valores validados
    const formData = new FormData()
    formData.append('nombre', nombre)
    formData.append('edad', edadNum.toString())
    formData.append('sexo', sexo)
    formData.append('id_raza_fk', idRazaNum.toString())
    if (foto) {
      formData.append('foto', foto)
    }

    await onSubmit(formData)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Registrar Nuevo Perro</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            required
            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Edad</label>
          <input
            type="number"
            name="edad"
            required
            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sexo</label>
          <select
            name="sexo"
            required
            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecciona el sexo</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Raza</label>
          <select
            name="id_raza_fk"
            required
            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecciona una raza</option>
            {razas.map(raza => (
              <option key={raza.id_raza_pk} value={raza.id_raza_pk.toString()}>
                {raza.tipo_de_raza} ({raza.tamano})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Foto</label>
          <input
            type="file"
            name="foto"
            accept="image/*"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Registrar Perro
        </button>
      </form>
    </div>
  )
}
