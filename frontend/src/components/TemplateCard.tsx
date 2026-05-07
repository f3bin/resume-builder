'use client';

import { TemplateType } from '@/types/resume';

interface Props {
  type: TemplateType;
  selected: boolean;
  onSelect: () => void;
}

const meta: Record<TemplateType, { name: string; desc: string; preview: string }> = {
  modern: {
    name: 'Modern',
    desc: 'Two-column layout with blue accent sidebar',
    preview: 'bg-gradient-to-br from-blue-600 to-blue-800',
  },
  classic: {
    name: 'Classic',
    desc: 'Traditional ATS-friendly single column',
    preview: 'bg-gradient-to-br from-gray-700 to-gray-900',
  },
  minimal: {
    name: 'Minimal',
    desc: 'Clean single column with lots of whitespace',
    preview: 'bg-gradient-to-br from-gray-100 to-gray-300',
  },
};

export default function TemplateCard({ type, selected, onSelect }: Props) {
  const { name, desc, preview } = meta[type];

  return (
    <button
      onClick={onSelect}
      className={`group rounded-2xl border-2 p-1 transition-all text-left ${
        selected ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      {/* Mini preview */}
      <div className={`${preview} rounded-xl h-48 w-full mb-4 flex items-center justify-center`}>
        <div className="bg-white/20 rounded-lg w-3/4 h-3/4 flex flex-col gap-2 p-3">
          {type === 'modern' ? (
            <div className="flex h-full gap-2">
              <div className="w-1/3 bg-white/30 rounded" />
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="h-2 bg-white/60 rounded w-3/4" />
                <div className="h-1.5 bg-white/40 rounded w-1/2" />
                <div className="h-px bg-white/30 rounded mt-1" />
                <div className="h-1.5 bg-white/40 rounded w-full" />
                <div className="h-1.5 bg-white/40 rounded w-4/5" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5 h-full justify-center">
              <div className="h-2.5 bg-white/70 rounded w-2/3 mx-auto" />
              <div className="h-px bg-white/40 rounded mt-1" />
              <div className="h-1.5 bg-white/50 rounded w-full" />
              <div className="h-1.5 bg-white/50 rounded w-4/5" />
              <div className="h-px bg-white/30 rounded mt-1" />
              <div className="h-1.5 bg-white/50 rounded w-3/4" />
            </div>
          )}
        </div>
      </div>
      <div className="px-2 pb-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-800">{name}</h3>
          {selected && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              Selected
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
    </button>
  );
}
