"use client"

import React from 'react';

interface ListaCitasProps {
  citas: Array<{
    id_cita_pk: number;
    fecha: string;
    horario_disponible: string;
    costo_total: number;
    observaciones: string;
    nombre_empleado: string;
    nombre_perro: string;
    pagada: boolean;
    id_perro_fk: number;
  }>;
}

export default function ListaCitas({ citas }: ListaCitasProps) {
  if (citas.length === 0) {
    return (
      <div className="mt-8">
        <p className="text-gray-500 text-center">No hay citas programadas</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Mis Citas</h3>
      <div className="space-y-4">
        {citas.map((cita) => (
          <div key={cita.id_cita_pk} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{cita.nombre_perro}</p>
                <p className="text-sm text-gray-500">{cita.fecha} - {cita.horario_disponible}</p>
                <p className="text-sm text-gray-500">Empleado: {cita.nombre_empleado}</p>
                <p className="text-sm text-gray-500">Costo: {new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP'
                }).format(cita.costo_total)}</p>
                {cita.observaciones && (
                  <p className="mt-2 text-sm">Observaciones: {cita.observaciones}</p>
                )}
              </div>
              <div className="ml-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  cita.pagada 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {cita.pagada ? 'Pagada' : 'Pendiente'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
