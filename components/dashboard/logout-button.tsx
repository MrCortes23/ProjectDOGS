'use client';

export default function LogoutButton() {
  const handleLogout = () => {
    // Clear cookies
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/login';
  };

  return (
    <button
      type="button"
      className="bg-black rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={handleLogout}
    >
      Cerrar Sesión
    </button>
  );
}
