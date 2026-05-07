'use client';

import { PersonalInfo } from '@/types/resume';

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const fields: { key: keyof PersonalInfo; label: string; placeholder: string; type?: string }[] = [
  { key: 'name', label: 'Full Name', placeholder: 'John Doe' },
  { key: 'title', label: 'Job Title / Headline', placeholder: 'Software Engineer' },
  { key: 'email', label: 'Email', placeholder: 'john@example.com', type: 'email' },
  { key: 'phone', label: 'Phone', placeholder: '+1 234 567 8900' },
  { key: 'location', label: 'Location', placeholder: 'New York, USA' },
  { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'linkedin.com/in/johndoe' },
  { key: 'github', label: 'GitHub URL', placeholder: 'github.com/johndoe' },
];

export default function PersonalInfoForm({ data, onChange }: Props) {
  const handleChange = (key: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-3">
      {fields.map(({ key, label, placeholder, type }) => (
        <div key={key}>
          <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
          <input
            type={type || 'text'}
            value={data[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={placeholder}
            className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}
    </div>
  );
}
