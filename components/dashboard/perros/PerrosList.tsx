"use client"

export interface Perro {
  id_perro_pk: number
  id_cliente_fk: number
  nombre: string
  edad: string
  sexo: string
}

interface PerrosListProps {
  perros: Perro[]
  onEdit: (perro: Perro) => void
  onDelete: (id: number) => void
}

export default function PerrosList({ perros, onEdit, onDelete }: PerrosListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Perros Registrados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {perros.map((perro) => (
          <div key={perro.id_perro_pk} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{perro.nombre}</h3>
                <p className="text-gray-600">Edad: {perro.edad}</p>
                <p className="text-gray-600">Sexo: {perro.sexo}</p>
              </div>
              <div className="flex space-x-2">
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
