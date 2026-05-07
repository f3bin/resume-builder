import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export default function Minimal({ data }: Props) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white px-14 py-12 text-gray-800" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light tracking-tight text-gray-900">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.title && (
          <p className="text-sm text-gray-500 mt-1">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-7">
          <div className="h-px bg-gray-100 mb-4" />
          <p className="text-xs leading-relaxed text-gray-600">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-7">
          <div className="h-px bg-gray-100 mb-4" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Experience</h2>
          <div className="flex flex-col gap-5">
            {experience.map((exp, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-24 shrink-0 text-xs text-gray-400 pt-0.5">
                  <p>{exp.startDate}</p>
                  <p>{exp.endDate || 'Present'}</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">{exp.title}</p>
                  <p className="text-xs text-gray-500 mb-1">{exp.company}</p>
                  {exp.description && (
                    <p className="text-xs text-gray-600 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-7">
          <div className="h-px bg-gray-100 mb-4" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Education</h2>
          <div className="flex flex-col gap-4">
            {education.map((edu, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-24 shrink-0 text-xs text-gray-400 pt-0.5">
                  <p>{edu.startYear}</p>
                  <p>{edu.endYear}</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.institution}{edu.field ? ` · ${edu.field}` : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <div className="h-px bg-gray-100 mb-4" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="text-xs border border-gray-200 text-gray-600 px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
