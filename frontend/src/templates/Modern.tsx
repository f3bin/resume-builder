import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export default function Modern({ data }: Props) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="flex min-h-[297mm] w-[210mm] bg-white text-sm font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div className="w-[72mm] bg-blue-700 text-white p-6 flex flex-col gap-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold leading-tight">{personalInfo.name || 'Your Name'}</h1>
          <p className="text-blue-200 mt-1 text-sm">{personalInfo.title || 'Job Title'}</p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-2">Contact</h2>
          <div className="flex flex-col gap-1 text-xs text-blue-100">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, i) => (
                <span key={i} className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 flex flex-col gap-6">
        {summary && (
          <div>
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wide border-b border-blue-200 pb-1 mb-2">
              Profile
            </h2>
            <p className="text-gray-600 text-xs leading-relaxed">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wide border-b border-blue-200 pb-1 mb-3">
              Experience
            </h2>
            <div className="flex flex-col gap-4">
              {experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">{exp.title}</p>
                      <p className="text-blue-600 text-xs">{exp.company}</p>
                    </div>
                    <p className="text-gray-400 text-xs whitespace-nowrap ml-2">
                      {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ' – Present'}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-gray-600 text-xs mt-1 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wide border-b border-blue-200 pb-1 mb-3">
              Education
            </h2>
            <div className="flex flex-col gap-3">
              {education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">{edu.degree}</p>
                      <p className="text-blue-600 text-xs">{edu.institution}{edu.field ? ` · ${edu.field}` : ''}</p>
                    </div>
                    <p className="text-gray-400 text-xs whitespace-nowrap ml-2">
                      {edu.startYear}{edu.endYear ? ` – ${edu.endYear}` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
