"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from './logout-button';
import Logo from '@/components/logo';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  
  // No mostrar el sidebar en la ruta de administración
  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="w-64 h-screen bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center">
        <Logo />
      </div>
      <ul className="flex-grow space-y-2">
        <li>
          <Link 
            href="/dashboard" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
              ${isActive('/dashboard') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <span className="text-xl">📊</span>
            <span>Resumen</span>
          </Link>
        </li>
        <li>
          <Link 
            href="/dashboard/perros" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
              ${isActive('/dashboard/perros') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <span className="text-xl">🐶</span>
            <span>Perros</span>
          </Link>
        </li>
        <li>
          <Link 
            href="/dashboard/citas" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
              ${isActive('/dashboard/citas') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <span className="text-xl">📅</span>
            <span>Citas</span>
          </Link>
        </li>
        <li>
          <Link 
            href="/dashboard/facturacion" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
              ${isActive('/dashboard/facturacion') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <span className="text-xl">💰</span>
            <span>Facturación</span>
          </Link>
        </li>
        <li>
          <Link 
            href="/dashboard/configuracion" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
              ${isActive('/dashboard/configuracion') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <span className="text-xl">⚙️</span>
            <span>Configuración</span>
          </Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;