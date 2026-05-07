import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export default function Classic({ data }: Props) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white p-12 text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-900">
        <h1 className="text-3xl font-bold tracking-wide uppercase">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.title && (
          <p className="text-base mt-1 text-gray-600">{personalInfo.title}</p>
        )}
        <div className="flex justify-center flex-wrap gap-3 mt-2 text-xs text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <><span>·</span><span>{personalInfo.phone}</span></>}
          {personalInfo.location && <><span>·</span><span>{personalInfo.location}</span></>}
          {personalInfo.linkedin && <><span>·</span><span>{personalInfo.linkedin}</span></>}
          {personalInfo.github && <><span>·</span><span>{personalInfo.github}</span></>}
        </div>
      </div>

      {summary && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-2">
            Summary
          </h2>
          <p className="text-xs leading-relaxed text-gray-700">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-3">
            Experience
          </h2>
          <div className="flex flex-col gap-4">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-sm">{exp.title}</p>
                  <p className="text-xs text-gray-500">
                    {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ' – Present'}
                  </p>
                </div>
                <p className="italic text-xs text-gray-600 mb-1">{exp.company}</p>
                {exp.description && (
                  <p className="text-xs text-gray-700 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-3">
            Education
          </h2>
          <div className="flex flex-col gap-3">
            {education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-sm">{edu.degree}</p>
                  <p className="text-xs text-gray-500">
                    {edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}
                  </p>
                </div>
                <p className="italic text-xs text-gray-600">
                  {edu.institution}{edu.field ? `, ${edu.field}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-2">
            Skills
          </h2>
          <p className="text-xs text-gray-700">{skills.join(' · ')}</p>
        </div>
      )}
    </div>
  );
}
