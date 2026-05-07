'use client';

import { Experience } from '@/types/resume';

interface Props {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const emptyExp: Experience = { title: '', company: '', startDate: '', endDate: '', description: '' };

export default function ExperienceForm({ data, onChange }: Props) {
  const update = (index: number, field: keyof Experience, value: string) => {
    const updated = data.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp));
    onChange(updated);
  };

  const add = () => onChange([...data, { ...emptyExp }]);

  const remove = (index: number) => onChange(data.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      {data.map((exp, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-2 relative">
          <button
            onClick={() => remove(index)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg leading-none"
          >
            ×
          </button>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Job Title</label>
              <input
                value={exp.title}
                onChange={(e) => update(index, 'title', e.target.value)}
                placeholder="Software Engineer"
                className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
              <input
                value={exp.company}
                onChange={(e) => update(index, 'company', e.target.value)}
                placeholder="Acme Corp"
                className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
              <input
                value={exp.startDate}
                onChange={(e) => update(index, 'startDate', e.target.value)}
                placeholder="Jan 2022"
                className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
              <input
                value={exp.endDate}
                onChange={(e) => update(index, 'endDate', e.target.value)}
                placeholder="Present"
                className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => update(index, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
              className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border-2 border-dashed border-gray-200 rounded-lg py-2 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition"
      >
        + Add Experience
      </button>
    </div>
  );
}
