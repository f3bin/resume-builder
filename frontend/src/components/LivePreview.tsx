'use client';

import { ResumeData, TemplateType } from '@/types/resume';
import Modern from '@/templates/Modern';
import Classic from '@/templates/Classic';
import Minimal from '@/templates/Minimal';

interface Props {
  data: ResumeData;
  template: TemplateType;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

export default function LivePreview({ data, template, previewRef }: Props) {
  const TemplateComponent = template === 'modern' ? Modern : template === 'classic' ? Classic : Minimal;

  return (
    <div className="w-full h-full overflow-auto bg-gray-100 flex justify-center py-6 px-4">
      <div
        ref={previewRef}
        className="shadow-lg"
        style={{ width: '210mm', minHeight: '297mm' }}
      >
        <TemplateComponent data={data} />
      </div>
    </div>
  );
}
