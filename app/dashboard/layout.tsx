import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import Sidebar from '@/components/dashboard/Sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const allCookies = await cookies();
  const token = allCookies.get('token')?.value;
  const user = allCookies.get('user')?.value;

  if (!user || !token) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar />
      
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}
