'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ResumeForm from '@/components/ResumeForm';
import LivePreview from '@/components/LivePreview';
import { ResumeData, TemplateType, emptyResume } from '@/types/resume';
import api from '@/utils/api';
import { isAuthenticated, getUser } from '@/utils/auth';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function EditorPage() {
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResume);
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [initialLoading, setInitialLoading] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
      return;
    }
    loadResume();
  }, [router]);

  const loadResume = async () => {
    try {
      const { data } = await api.get('/api/resume');
      if (data.resume) setResumeData(data.resume);
      if (data.selectedTemplate) setTemplate(data.selectedTemplate as TemplateType);
    } catch {
      // Use empty resume if load fails
    } finally {
      setInitialLoading(false);
    }
  };

  const saveResume = useCallback(async (data: ResumeData) => {
    setSaveStatus('saving');
    try {
      await api.put('/api/resume', { resume: data });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch {
      setSaveStatus('error');
    }
  }, []);

  const handleChange = (data: ResumeData) => {
    setResumeData(data);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => saveResume(data), 1000);
  };

  const handleManualSave = () => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveResume(resumeData);
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    try {
      // Handle different module resolution formats for dynamic imports
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;
      
      const name = resumeData.personalInfo.name || 'resume';
      const filename = name.toLowerCase().replace(/\s+/g, '_') + '_resume.pdf';
      
      await html2pdf()
        .set({
          margin: 0,
          filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(previewRef.current)
        .save();
    } catch (err: any) {
      console.error('PDF export failed:', err);
      alert('PDF export failed: ' + (err.message || err));
    }
  };

  const user = getUser();

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-sm">Loading your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Editor toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Template:</span>
          <div className="flex gap-1">
            {(['modern', 'classic', 'minimal'] as TemplateType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTemplate(t)}
                className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition ${
                  template === t
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-xs ${
            saveStatus === 'saving' ? 'text-yellow-600' :
            saveStatus === 'saved' ? 'text-green-600' :
            saveStatus === 'error' ? 'text-red-600' : 'text-gray-400'
          }`}>
            {saveStatus === 'saving' ? 'Saving...' :
             saveStatus === 'saved' ? 'Saved ✓' :
             saveStatus === 'error' ? 'Save failed' : ''}
          </span>
          <button
            onClick={handleManualSave}
            className="px-3 py-1.5 text-xs border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition"
          >
            Save
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Split-screen editor */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Form */}
        <div className="w-[420px] shrink-0 border-r border-gray-200 bg-white overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700">Edit Resume</h2>
            {user && <p className="text-xs text-gray-400">{user.email}</p>}
          </div>
          <div className="flex-1 overflow-hidden">
            <ResumeForm data={resumeData} onChange={handleChange} />
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="flex-1 overflow-hidden">
          <LivePreview data={resumeData} template={template} previewRef={previewRef} />
        </div>
      </div>
    </div>
  );
}
