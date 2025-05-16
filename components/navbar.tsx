'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const mainNavItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Contacto', href: '/contacto' },
];

const authNavItems = [
  { label: 'Iniciar sesión', href: '/login' },
  { label: 'Registrarse', href: '/registro' },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Navegación principal */}
        <ul className="flex space-x-6">
          {mainNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-gray-800 hover:text-blue-600 font-medium ${
                  pathname === item.href ? 'border-b-2 border-blue-600' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botones de autenticación */}
        <ul className="flex space-x-4">
          {authNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-gray-600 hover:text-blue-600 ${
                  pathname === item.href ? 'font-semibold underline' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
