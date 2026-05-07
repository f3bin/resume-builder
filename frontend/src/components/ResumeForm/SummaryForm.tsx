'use client';

interface Props {
  data: string;
  onChange: (value: string) => void;
}

export default function SummaryForm({ data, onChange }: Props) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        Summary / Bio <span className="text-gray-400 font-normal">(optional)</span>
      </label>
      <textarea
        value={data}
        onChange={(e) => onChange(e.target.value)}
        placeholder="A short paragraph about yourself — shown at the top of your resume..."
        rows={4}
        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      />
    </div>
  );
}
