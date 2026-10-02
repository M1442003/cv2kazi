"use client";
import type { CVData } from "./CVBuilder";

export type TemplateId = "classic" | "modern" | "minimal";

export default function CVPreview({
  data,
  template = "classic",
  id = "cv-preview",
}: {
  data: CVData;
  template?: TemplateId;
  id?: string;
}) {
  if (template === "modern") return <ModernTemplate data={data} id={id} />;
  if (template === "minimal") return <MinimalTemplate data={data} id={id} />;
  return <ClassicTemplate data={data} id={id} />;
}

/* ============================================================
   CLASSIC — serif, traditional, safest for conservative employers
   ============================================================ */
function ClassicTemplate({ data, id }: { data: CVData; id: string }) {
  return (
    <div
      id={id}
      className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-slate-900"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <div className="border-b-2 border-slate-900 pb-4 mb-5 text-center">
        <h1 className="text-3xl font-bold">
          {data.fullName || "Your Name"}
        </h1>
        <div className="text-sm text-slate-600 mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>· {data.phone}</span>}
          {data.location && <span>· {data.location}</span>}
        </div>
      </div>

      {data.summary && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            {data.summary}
          </p>
        </section>
      )}

      {data.experience.some((e) => e.role || e.company) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-slate-900">
                    {exp.role || "Role"}
                  </div>
                  <div className="text-xs text-slate-500">{exp.dates}</div>
                </div>
                {exp.company && (
                  <div className="text-sm text-slate-600 italic">
                    {exp.company}
                  </div>
                )}
                {exp.bullets && (
                  <ul className="list-disc pl-5 mt-1 space-y-0.5 text-sm text-slate-700">
                    {exp.bullets
                      .split("\n")
                      .filter((b) => b.trim())
                      .map((b, bi) => (
                        <li key={bi}>{b.replace(/^[-•*]\s*/, "")}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.some((e) => e.school) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-sm">
                    {edu.school || "School"}
                  </div>
                  <div className="text-xs text-slate-500">{edu.year}</div>
                </div>
                {edu.degree && (
                  <div className="text-sm text-slate-700">{edu.degree}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2">
            Skills
          </h2>
          <p className="text-sm text-slate-700">{data.skills}</p>
        </section>
      )}

      {data.languages && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2">
            Languages
          </h2>
          <p className="text-sm text-slate-700">{data.languages}</p>
        </section>
      )}
    </div>
  );
}

/* ============================================================
   MODERN — colored header, sans-serif, borders
   ============================================================ */
function ModernTemplate({ data, id }: { data: CVData; id: string }) {
  return (
    <div
      id={id}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Colored header band */}
      <div className="bg-brand-red text-white px-8 py-6">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {data.fullName || "Your Name"}
        </h1>
        <div className="text-xs mt-2 flex flex-wrap gap-x-4 gap-y-1 text-red-100">
          {data.email && <span>✉ {data.email}</span>}
          {data.phone && <span>☎ {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
        </div>
      </div>

      <div className="p-8 space-y-5">
        {data.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-red mb-2">
              Profile
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              {data.summary}
            </p>
          </section>
        )}

        {data.experience.some((e) => e.role || e.company) && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-red mb-3">
              Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, i) => (
                <div key={i} className="border-l-2 border-brand-red/20 pl-3">
                  <div className="flex justify-between items-baseline">
                    <div className="font-bold text-slate-900">
                      {exp.role || "Role"}
                    </div>
                    <div className="text-xs text-slate-500">{exp.dates}</div>
                  </div>
                  {exp.company && (
                    <div className="text-sm text-brand-red font-medium">
                      {exp.company}
                    </div>
                  )}
                  {exp.bullets && (
                    <ul className="list-disc pl-5 mt-1 space-y-0.5 text-sm text-slate-700">
                      {exp.bullets
                        .split("\n")
                        .filter((b) => b.trim())
                        .map((b, bi) => (
                          <li key={bi}>{b.replace(/^[-•*]\s*/, "")}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {data.education.some((e) => e.school) && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-brand-red mb-3">
                Education
              </h2>
              <div className="space-y-2">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <div className="font-bold text-sm">
                      {edu.school || "School"}
                    </div>
                    {edu.degree && (
                      <div className="text-xs text-slate-600">
                        {edu.degree}
                      </div>
                    )}
                    {edu.year && (
                      <div className="text-xs text-slate-400">{edu.year}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-brand-red mb-3">
                Skills
              </h2>
              <div className="text-sm text-slate-700 whitespace-pre-wrap">
                {data.skills}
              </div>
            </section>
          )}
        </div>

        {data.languages && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-red mb-2">
              Languages
            </h2>
            <p className="text-sm text-slate-700">{data.languages}</p>
          </section>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   MINIMAL — clean, no color, lots of whitespace, elegant
   ============================================================ */
function MinimalTemplate({ data, id }: { data: CVData; id: string }) {
  return (
    <div
      id={id}
      className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 text-slate-900"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <h1 className="text-4xl font-light tracking-tight">
        {data.fullName || "Your Name"}
      </h1>

      <div className="text-sm text-slate-500 mt-3 flex flex-wrap gap-x-3 gap-y-1">
        {data.email && <span>{data.email}</span>}
        {data.email && (data.phone || data.location) && (
          <span className="text-slate-300">|</span>
        )}
        {data.phone && <span>{data.phone}</span>}
        {data.phone && data.location && (
          <span className="text-slate-300">|</span>
        )}
        {data.location && <span>{data.location}</span>}
      </div>

      <hr className="my-6 border-slate-200" />

      {data.summary && (
        <section className="mb-6">
          <p className="text-sm leading-relaxed text-slate-600">
            {data.summary}
          </p>
        </section>
      )}

      {data.experience.some((e) => e.role || e.company) && (
        <section className="mb-6">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
            Experience
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <div className="text-sm font-semibold">
                    {exp.role || "Role"}
                  </div>
                  <div className="text-xs text-slate-400">{exp.dates}</div>
                </div>
                {exp.company && (
                  <div className="text-xs text-slate-500 mb-1">
                    {exp.company}
                  </div>
                )}
                {exp.bullets && (
                  <ul className="space-y-0.5 text-sm text-slate-600 mt-1">
                    {exp.bullets
                      .split("\n")
                      .filter((b) => b.trim())
                      .map((b, bi) => (
                        <li key={bi} className="pl-3 relative">
                          <span className="absolute left-0 text-slate-300">
                            —
                          </span>
                          {b.replace(/^[-•*]\s*/, "")}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.some((e) => e.school) && (
        <section className="mb-6">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <div className="text-sm font-semibold">
                    {edu.school || "School"}
                  </div>
                  <div className="text-xs text-slate-400">{edu.year}</div>
                </div>
                {edu.degree && (
                  <div className="text-xs text-slate-500">{edu.degree}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills && (
        <section className="mb-6">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
            Skills
          </h2>
          <p className="text-sm text-slate-600">{data.skills}</p>
        </section>
      )}

      {data.languages && (
        <section>
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
            Languages
          </h2>
          <p className="text-sm text-slate-600">{data.languages}</p>
        </section>
      )}
    </div>
  );
}