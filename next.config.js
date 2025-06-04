/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['localhost', 'dogsv1-e74lpvbks-corts23s-projects.vercel.app'],
    unoptimized: true,
  },
  // Desactiva la optimización CSS
  experimental: {
    optimizeCss: false
  },
  // Configuración de cabeceras para CORS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          }
        ],
      },
    ];
  }
}

module.exports = nextConfig