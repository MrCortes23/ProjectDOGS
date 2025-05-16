import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import LogoutButton from '@/components/dashboard/logout-button';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Verificar si hay sesión iniciada usando cookies
  const allCookies = await cookies();
  const token = allCookies.get('token')?.value;
  const user = allCookies.get('user')?.value;

  if (!user || !token) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-indigo-600">Mi Dashboard</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-3 relative">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
