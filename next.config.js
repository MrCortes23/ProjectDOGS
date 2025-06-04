/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['localhost', 'dogsv1-cqcacbrw5-corts23s-projects.vercel.app'],
    unoptimized: true,
  },
  // Elimina el assetPrefix para usar rutas relativas
  // Configuración de cabeceras para CORS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  // Configuración de caché para recursos estáticos
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig