'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import TemplateCard from '@/components/TemplateCard';
import { TemplateType } from '@/types/resume';
import api from '@/utils/api';
import { isAuthenticated, getUser, setAuth, getToken } from '@/utils/auth';

export default function TemplatesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<TemplateType>('modern');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
      return;
    }
    const user = getUser();
    if (user?.selectedTemplate) {
      setSelected(user.selectedTemplate as TemplateType);
    }
  }, [router]);

  const handleContinue = async () => {
    setLoading(true);
    try {
      await api.patch('/api/resume/template', { template: selected });
      const user = getUser();
      if (user) {
        setAuth(getToken()!, { ...user, selectedTemplate: selected });
      }
      router.push('/editor');
    } catch {
      router.push('/editor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Choose a template</h1>
          <p className="text-gray-500 mt-1 text-sm">Pick a design for your resume. You can change this later.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {(['modern', 'classic', 'minimal'] as TemplateType[]).map((t) => (
            <TemplateCard
              key={t}
              type={t}
              selected={selected === t}
              onSelect={() => setSelected(t)}
            />
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            disabled={loading}
            className="px-8 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60 transition"
          >
            {loading ? 'Saving...' : 'Continue to Editor →'}
          </button>
        </div>
      </div>
    </div>
  );
}
