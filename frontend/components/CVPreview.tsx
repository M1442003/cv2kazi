"use client";
import type { CVData } from "./CVBuilder";

export type TemplateId = "classic" | "modern" | "minimal";

export type TemplateColorId =
  | "red"
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "slate";

export const TEMPLATE_COLORS: Record<
  TemplateColorId,
  { hex: string; label: string }
> = {
  red:    { hex: "#DC2626", label: "Red" },
  blue:   { hex: "#1E3A8A", label: "Blue" },
  green:  { hex: "#059669", label: "Green" },
  purple: { hex: "#7C3AED", label: "Purple" },
  orange: { hex: "#EA580C", label: "Orange" },
  slate:  { hex: "#334155", label: "Slate" },
};

export default function CVPreview({
  data,
  template = "classic",
  id = "cv-preview",
  color = "red",
}: {
  data: CVData;
  template?: TemplateId;
  id?: string;
  color?: TemplateColorId;
}) {
  const accent = TEMPLATE_COLORS[color].hex;

  if (template === "modern")
    return <ModernTemplate data={data} id={id} accent={accent} />;
  if (template === "minimal")
    return <MinimalTemplate data={data} id={id} accent={accent} />;
  return <ClassicTemplate data={data} id={id} accent={accent} />;
}

/* ============================================================
   CLASSIC
   ============================================================ */
function ClassicTemplate({
  data,
  id,
  accent,
}: {
  data: CVData;
  id: string;
  accent: string;
}) {
  return (
    <div
      id={id}
      className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-slate-900"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <div
        className="border-b-2 pb-4 mb-5 text-center"
        style={{ borderColor: accent }}
      >
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
   MODERN
   ============================================================ */
function ModernTemplate({
  data,
  id,
  accent,
}: {
  data: CVData;
  id: string;
  accent: string;
}) {
  return (
    <div
      id={id}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div className="text-white px-8 py-6" style={{ background: accent }}>
        <h1 className="text-3xl font-extrabold tracking-tight">
          {data.fullName || "Your Name"}
        </h1>
        <div className="text-xs mt-2 flex flex-wrap gap-x-4 gap-y-1 text-white/80">
          {data.email && <span>✉ {data.email}</span>}
          {data.phone && <span>☎ {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
        </div>
      </div>

      <div className="p-8 space-y-5">
        {data.summary && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: accent }}
            >
              Profile
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              {data.summary}
            </p>
          </section>
        )}

        {data.experience.some((e) => e.role || e.company) && (
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: accent }}
            >
              Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  className="border-l-2 pl-3"
                  style={{ borderColor: `${accent}33` }}
                >
                  <div className="flex justify-between items-baseline">
                    <div className="font-bold text-slate-900">
                      {exp.role || "Role"}
                    </div>
                    <div className="text-xs text-slate-500">{exp.dates}</div>
                  </div>
                  {exp.company && (
                    <div
                      className="text-sm font-medium"
                      style={{ color: accent }}
                    >
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
              <h2
                className="text-xs font-bold uppercase tracking-wider mb-3"
                style={{ color: accent }}
              >
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
              <h2
                className="text-xs font-bold uppercase tracking-wider mb-3"
                style={{ color: accent }}
              >
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
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: accent }}
            >
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
   MINIMAL
   ============================================================ */
function MinimalTemplate({
  data,
  id,
  accent,
}: {
  data: CVData;
  id: string;
  accent: string;
}) {
  return (
    <div
      id={id}
      className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 text-slate-900"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <h1
        className="text-4xl font-light tracking-tight"
        style={{ color: accent }}
      >
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

      <hr
        className="my-6 border-slate-200"
        style={{ borderColor: `${accent}33` }}
      />

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