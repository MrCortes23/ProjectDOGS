import { Cita } from './types';

import { Document, Page, PDFDownloadLink } from '@react-pdf/renderer';
import FacturaPDF from './FacturaPDF';

interface TarjetaCitaProps {
  cita: Cita;
  isSelected: boolean;
  onToggleSelect: () => void;
  onCancelar: () => void;
}

export default function TarjetaCita({
  cita,
  isSelected,
  onToggleSelect,
  onCancelar
}: TarjetaCitaProps) {

  const fechaFormateada = cita.fecha ? new Date(cita.fecha).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Sin fecha';



  return (
    <div className={`p-4 border rounded-lg mb-4 ${
      isSelected ? 'bg-blue-50 border-blue-200' : 'bg-gray-100 border-gray-200'
    }`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">{cita.nombre_perro}</h3>
          {cita.estado === 'pagada' && (
            <span className="ml-2 px-3 py-1 rounded-full bg-green-50 hover:bg-green-100 text-green-600 text-sm">
              Pagada
            </span>
          )}
        </div>
        {cita.estado !== 'pagada' && (
          <button
            className="text-red-500 hover:text-red-700"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        )}
      </div>
      <div className="mt-2 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Fecha:</span>
          <span className="font-medium">{fechaFormateada}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Horario:</span>
          <span className="font-medium">{cita.horario_disponible}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Empleado:</span>
          <span className="font-medium">{cita.nombre_empleado}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Costo:</span>
          <span className="font-medium">${cita.costo_total.toLocaleString()}</span>
        </div>
      </div>
      {cita.estado === 'pagada' && (
        <div className="flex flex-col gap-2">
          <div className="text-sm text-gray-600">
            Pagado con {cita.metodo_pago || 'Sin método de pago'} el {cita.fecha_pago ? new Date(cita.fecha_pago).toLocaleDateString('es-CO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'Sin fecha'}
          </div>
          <div className="flex justify-end">
            {cita.id_cita_pk && cita.fecha && cita.horario_disponible && cita.nombre_perro && cita.nombre_empleado && cita.costo_total ? (
              <PDFDownloadLink
                document={
                  <Document>
                    <Page size="A4">
                      <FacturaPDF cita={cita} />
                    </Page>
                  </Document>
                }
                fileName={`factura_${cita.id_cita_pk}.pdf`}
              >
                {({ loading }: { loading: boolean }) => (
                  <button
                    disabled={loading}
                    className="flex justify-center items-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200"
                    title="Descargar factura"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </button>
                )}
              </PDFDownloadLink>
            ) : (
              <button
                className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-100"
                disabled
                title="No se puede generar factura"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
      {cita.estado !== 'pagada' && (
        <div className="mt-4">
          <button
            className={`px-4 py-2 rounded ${
              isSelected
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
            onClick={onToggleSelect}
          >
            {isSelected ? 'Seleccionado' : 'Seleccionar'}
          </button>
        </div>
      )}
    </div>
  );
}
