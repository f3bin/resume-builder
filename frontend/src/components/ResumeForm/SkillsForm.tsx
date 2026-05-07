'use client';

import { useState, KeyboardEvent } from 'react';

interface Props {
  data: string[];
  onChange: (data: string[]) => void;
}

export default function SkillsForm({ data, onChange }: Props) {
  const [input, setInput] = useState('');

  const addSkill = () => {
    const skill = input.trim();
    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
    }
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  };

  const remove = (skill: string) => onChange(data.filter((s) => s !== skill));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 min-h-[36px]">
        {data.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs px-3 py-1 rounded-full"
          >
            {skill}
            <button
              onClick={() => remove(skill)}
              className="hover:text-red-500 ml-0.5 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter or comma"
          className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addSkill}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}
