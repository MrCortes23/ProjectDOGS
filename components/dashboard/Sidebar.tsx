import React from 'react';
import  Link  from 'next/link';
import LogoutButton from './logout-button';

const Sidebar: React.FC = () => {
  return (
    <nav className="w-64 h-screen bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-indigo-600">DOGS</span>
          </Link>
      </div>
      <ul className="flex-grow space-y-2">
      <li>
          <Link 
            href="/dashboard" 
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-xl">📊</span>
            <span>Resumen</span>
          </Link>
        </li>
        <li>
          <Link 
            href="/dashboard/perros" 
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-xl">🐶</span>
            <span>Perros</span>
          </Link>
        </li>
        <li>
          <Link 
            href="/dashboard/citas" 
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-xl">📅</span>
            <span>Citas</span>
          </Link>
        </li>
        <li>
          <Link 
            href="/dashboard/facturacion" 
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-xl">💰</span>
            <span>Facturación</span>
          </Link>
        </li>
        <li>
          <Link 
            href="/dashboard/configuracion" 
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-xl">⚙️</span>
            <span>Configuración</span>
          </Link>
        </li>
      </ul>
      <div className="mt-4">
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Sidebar;