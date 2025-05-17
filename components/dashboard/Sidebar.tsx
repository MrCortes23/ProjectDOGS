import React from 'react';
import  Link  from 'next/link';
import LogoutButton from './logout-button';

const Sidebar: React.FC = () => {
  return (
    <nav className="w-64 h-screen bg-white border-r border-gray-200 p-4 flex flex-col">
      <ul className="flex-grow space-y-2">
        <li>
          <Link 
            href="/perros" 
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-xl">🐶</span>
            <span>Perros</span>
          </Link>
        </li>
        <li>
          <Link 
            href="/citas" 
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-xl">📅</span>
            <span>Citas</span>
          </Link>
        </li>
        <li>
          <Link 
            href="/configuracion" 
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