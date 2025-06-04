/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // Elimina las cabeceras CORS temporalmente
  // Elimina cualquier configuración experimental
}

module.exports = nextConfig