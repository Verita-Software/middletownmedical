import { GraduationCap } from "lucide-react";

interface ProviderEducationCardProps {
  education?: string[];
}

export function ProviderEducationCard({
  education,
}: ProviderEducationCardProps) {
  if (!education || education.length === 0) return null;

  return (
    <section id="education-credentials">
      <h2 className="text-3xl font-extrabold text-[#002147] mb-8">
        Education &amp; Credentials
      </h2>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-[#002147]" />
            <h3 className="font-extrabold text-xl text-[#002147]">Education</h3>
          </div>
        </div>
        <div className="px-6 py-8">
          <ul className="space-y-4">
            {education.map((edu, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-[#b5097b] mt-2.5 shrink-0" />
                <span className="text-slate-600 text-lg leading-relaxed">
                  {edu}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
