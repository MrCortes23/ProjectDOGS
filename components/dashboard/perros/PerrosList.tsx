/* eslint-disable @next/next/no-img-element */
"use client"

import { Perro } from './types'

interface PerrosListProps {
  perros: Perro[]
  onEdit: (perro: Perro) => void
  onDelete: (id: number) => void
}

export default function PerrosList({ perros, onEdit, onDelete }: PerrosListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Perros Registrados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {perros.map((perro) => (
          <div key={perro.id_perro_pk} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              {perro.foto_data && perro.foto_data.length > 0 ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <img 
                    src={`data:image/jpeg;base64,${Buffer.from(perro.foto_data as Buffer).toString('base64')}`}
                    alt={perro.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Sin foto</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{perro.nombre}</h3>
              <p className="text-sm text-gray-600 mt-1">Edad: {perro.edad}</p>
              <p className="text-sm text-gray-600 mt-1">Sexo: {perro.sexo}</p>
              <p className="text-sm text-gray-600 mt-1">Raza: {perro.raza || 'Sin especificar'}</p>
              <div className="mt-4 flex justify-end gap-2">
                <button 
                  onClick={() => onEdit(perro)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(perro.id_perro_pk)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
