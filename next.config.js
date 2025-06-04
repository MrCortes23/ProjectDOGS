/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['localhost', 'dogsv1-mxpol6cul-corts23s-projects.vercel.app'],
    unoptimized: true,
  },
  // Asegúrate de que las rutas de los assets sean correctas
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://dogsv1-mxpol6cul-corts23s-projects.vercel.app' : '',
  // Configuración de cabeceras para los assets
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|css|js)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig