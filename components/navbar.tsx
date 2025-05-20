'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Logo from '@/components/logo';
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { Menu } from "lucide-react"

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  }

  return (
    <header className="bg-primary text-primary-foreground w-full shadow-md">
      <div className="container mx-auto px-20 py-3">
        <div className="flex items-center justify-between w-full">
          <Logo className="flex items-center space-x-2" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center space-x-6">
            <Link
              href="/"
              className={`text-primary-foreground text-center hover:text-secondary transition-colors ${isActive("/") ? "text-secondary" : ""}`}
            >
              Inicio
            </Link>
            <Link
              href="/servicios"
              className={`text-primary-foreground text-center hover:text-secondary transition-colors ${isActive("/servicios") ? "text-secondary" : ""}`}
            >
              Servicios
            </Link>
            <Link
              href="/galeria"
              className={`text-primary-foreground text-center hover:text-secondary transition-colors ${isActive("/galeria") ? "text-secondary" : ""}`}
            >
              Galería
            </Link>
            <Link
              href="/contacto"
              className={`text-primary-foreground text-center hover:text-secondary transition-colors ${isActive("/contacto") ? "text-secondary" : ""}`}
            >
              Contacto
            </Link>
          </nav>

          <div className="hidden items-center space-x-3 md:flex">
            <Button
              variant="default"
              className="nav-button nav-button-secondary rounded-md border border-gray-300 hover:border-gray-400"
              onClick={() => window.location.href = '/login'}
            >
              Iniciar Sesión
            </Button>
            <Button
              variant="default"
              className="nav-button nav-button-secondary rounded-md border border-gray-300 hover:border-gray-400"
              onClick={() => window.location.href = '/registro'}
            >
              Registrarse
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="menu-toggle-icon" /> : <Menu className="menu-toggle-icon" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-menu-nav">
              <Link
                href="/"
                className={`mobile-menu-link ${isActive("/") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/servicios"
                className={`mobile-menu-link ${isActive("/servicios") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link
                href="/galeria"
                className={`mobile-menu-link ${isActive("/galeria") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Galería
              </Link>
              <Link
                href="/contacto"
                className={`mobile-menu-link ${isActive("/contacto") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="mobile-menu-buttons">
                <Button
                  variant="outline"
                  className="mobile-menu-button nav-button nav-button-outline"
                  onClick={() => window.location.href = '/login'}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="secondary"
                  className="mobile-menu-button nav-button nav-button-secondary"
                  onClick={() => window.location.href = '/registro'}
                >
                  Registrarse
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
