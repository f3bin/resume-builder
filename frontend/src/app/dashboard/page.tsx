'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { isAuthenticated, getUser } from '@/utils/auth';

export default function DashboardPage() {
  const router = useRouter();
  const user = getUser();

  useEffect(() => {
    if (!isAuthenticated()) router.replace('/login');
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-500 text-sm mb-8">Continue building your resume.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/editor"
            className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-3">✏️</div>
            <h2 className="font-semibold text-gray-800 mb-1">Resume Editor</h2>
            <p className="text-sm text-gray-500">Edit your content and see the live preview</p>
          </Link>

          <Link
            href="/templates"
            className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-3">🎨</div>
            <h2 className="font-semibold text-gray-800 mb-1">Change Template</h2>
            <p className="text-sm text-gray-500">
              Currently using <span className="capitalize font-medium text-blue-600">{user.selectedTemplate}</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
