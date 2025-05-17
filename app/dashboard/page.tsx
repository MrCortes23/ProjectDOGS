"use client"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Bienvenido a tu Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Tarjetas de contenido */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Perros</h2>
          <p className="text-gray-600">Gestiona tus perros aquí</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Citas</h2>
          <p className="text-gray-600">Administra tus citas veterinarias</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Configuración</h2>
          <p className="text-gray-600">Ajustes de tu cuenta</p>
        </div>
      </div>
    </div>
  );
}
