'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clearAuth, getUser } from '@/utils/auth';

export default function Navbar() {
  const router = useRouter();
  const user = getUser();

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <Link href="/dashboard" className="text-xl font-bold text-blue-600">
        ResumeBuilder
      </Link>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm text-gray-600">Hi, {user.name}</span>
            <Link href="/editor" className="text-sm text-gray-700 hover:text-blue-600">
              Editor
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-700 hover:text-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
