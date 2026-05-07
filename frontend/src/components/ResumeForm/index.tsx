'use client';

import { useState } from 'react';
import { ResumeData, PersonalInfo, Experience, Education } from '@/types/resume';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import SummaryForm from './SummaryForm';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const sections = ['Personal', 'Summary', 'Experience', 'Education', 'Skills'] as const;
type Section = typeof sections[number];

export default function ResumeForm({ data, onChange }: Props) {
  const [active, setActive] = useState<Section>('Personal');

  const update = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Section tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto shrink-0">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActive(section)}
            className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition ${
              active === section
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Section content */}
      <div className="flex-1 overflow-y-auto p-4">
        {active === 'Personal' && (
          <PersonalInfoForm
            data={data.personalInfo}
            onChange={(v: PersonalInfo) => update('personalInfo', v)}
          />
        )}
        {active === 'Summary' && (
          <SummaryForm
            data={data.summary}
            onChange={(v: string) => update('summary', v)}
          />
        )}
        {active === 'Experience' && (
          <ExperienceForm
            data={data.experience}
            onChange={(v: Experience[]) => update('experience', v)}
          />
        )}
        {active === 'Education' && (
          <EducationForm
            data={data.education}
            onChange={(v: Education[]) => update('education', v)}
          />
        )}
        {active === 'Skills' && (
          <SkillsForm
            data={data.skills}
            onChange={(v: string[]) => update('skills', v)}
          />
        )}
      </div>
    </div>
  );
}
