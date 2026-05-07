'use client';

import { Education } from '@/types/resume';

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const emptyEdu: Education = { degree: '', institution: '', startYear: '', endYear: '', field: '' };

export default function EducationForm({ data, onChange }: Props) {
  const update = (index: number, field: keyof Education, value: string) => {
    const updated = data.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu));
    onChange(updated);
  };

  const add = () => onChange([...data, { ...emptyEdu }]);

  const remove = (index: number) => onChange(data.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      {data.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-2 relative">
          <button
            onClick={() => remove(index)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg leading-none"
          >
            ×
          </button>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Degree</label>
              <input
                value={edu.degree}
                onChange={(e) => update(index, 'degree', e.target.value)}
                placeholder="B.Sc. Computer Science"
                className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Institution</label>
              <input
                value={edu.institution}
                onChange={(e) => update(index, 'institution', e.target.value)}
                placeholder="MIT"
                className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Start Year</label>
              <input
                value={edu.startYear}
                onChange={(e) => update(index, 'startYear', e.target.value)}
                placeholder="2018"
                className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">End Year</label>
              <input
                value={edu.endYear}
                onChange={(e) => update(index, 'endYear', e.target.value)}
                placeholder="2022"
                className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Field (optional)</label>
              <input
                value={edu.field}
                onChange={(e) => update(index, 'field', e.target.value)}
                placeholder="Computer Science"
                className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border-2 border-dashed border-gray-200 rounded-lg py-2 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition"
      >
        + Add Education
      </button>
    </div>
  );
}
