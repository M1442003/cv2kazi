"use client";
import type { CVData } from "./CVBuilder";

export type TemplateId =
  | "classic"
  | "modern"
  | "minimal"
  | "executive"
  | "corporate"
  | "creative"
  | "two-column"
  | "compact"
  | "elegant"
  | "bold";

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
  red: { hex: "#DC2626", label: "Red" },
  blue: { hex: "#1E3A8A", label: "Blue" },
  green: { hex: "#059669", label: "Green" },
  purple: { hex: "#7C3AED", label: "Purple" },
  orange: { hex: "#EA580C", label: "Orange" },
  slate: { hex: "#334155", label: "Slate" },
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
  const props = { data, id, accent };

  switch (template) {
    case "modern":
      return <ModernTemplate {...props} />;
    case "minimal":
      return <MinimalTemplate {...props} />;
    case "executive":
      return <ExecutiveTemplate {...props} />;
    case "corporate":
      return <CorporateTemplate {...props} />;
    case "creative":
      return <CreativeTemplate {...props} />;
    case "two-column":
      return <TwoColumnTemplate {...props} />;
    case "compact":
      return <CompactTemplate {...props} />;
    case "elegant":
      return <ElegantTemplate {...props} />;
    case "bold":
      return <BoldTemplate {...props} />;
    default:
      return <ClassicTemplate {...props} />;
  }
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
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
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

/* ============================================================
   EXECUTIVE — photo, serif, premium
   ============================================================ */
function ExecutiveTemplate({
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
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <div className="flex items-center gap-6 pb-6 mb-6" style={{ borderBottom: `3px solid ${accent}` }}>
        {data.photo && (
          <img
            src={data.photo}
            alt=""
            className="w-24 h-24 rounded-full object-cover shrink-0"
            style={{ border: `3px solid ${accent}` }}
          />
        )}
        <div>
          <h1 className="text-4xl font-bold leading-tight">
            {data.fullName || "Your Name"}
          </h1>
          <div className="text-sm text-slate-600 mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>· {data.phone}</span>}
            {data.location && <span>· {data.location}</span>}
          </div>
        </div>
      </div>

      {data.summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: accent }}>
            Executive Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 italic">
            {data.summary}
          </p>
        </section>
      )}

      {data.experience.some((e) => e.role || e.company) && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: accent }}>
            Professional Experience
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <div className="font-bold">{exp.role || "Role"}</div>
                  <div className="text-xs text-slate-500">{exp.dates}</div>
                </div>
                {exp.company && <div className="text-sm italic text-slate-600">{exp.company}</div>}
                {exp.bullets && (
                  <ul className="list-disc pl-5 mt-1 space-y-0.5 text-sm text-slate-700">
                    {exp.bullets.split("\n").filter((b) => b.trim()).map((b, bi) => (
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
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: accent }}>
              Education
            </h2>
            <div className="space-y-2">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <div className="font-bold text-sm">{edu.school || "School"}</div>
                  {edu.degree && <div className="text-xs text-slate-600">{edu.degree}</div>}
                  {edu.year && <div className="text-xs text-slate-400">{edu.year}</div>}
                </div>
              ))}
            </div>
          </section>
        )}
        {data.skills && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: accent }}>
              Core Competencies
            </h2>
            <div className="text-sm text-slate-700 whitespace-pre-wrap">{data.skills}</div>
          </section>
        )}
      </div>

      {data.languages && (
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: accent }}>
            Languages
          </h2>
          <p className="text-sm text-slate-700">{data.languages}</p>
        </section>
      )}
    </div>
  );
}

/* ============================================================
   CORPORATE — photo left sidebar, clean grid
   ============================================================ */
function CorporateTemplate({
  data,
  id,
  accent,
}: {
  data: CVData;
  id: string;
  accent: string;
}) {
  return (
    <div id={id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div className="text-white px-8 py-6 flex items-center gap-5" style={{ background: accent }}>
        {data.photo && (
          <img src={data.photo} alt="" className="w-20 h-20 rounded-full object-cover border-4 border-white/30 shrink-0" />
        )}
        <div>
          <h1 className="text-3xl font-bold">{data.fullName || "Your Name"}</h1>
          <div className="text-xs mt-2 flex flex-wrap gap-x-4 gap-y-1 text-white/85">
            {data.email && <span>✉ {data.email}</span>}
            {data.phone && <span>☎ {data.phone}</span>}
            {data.location && <span>📍 {data.location}</span>}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-5">
        {data.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>Professional Summary</h2>
            <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
          </section>
        )}
        {data.experience.some((e) => e.role || e.company) && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp, i) => (
                <div key={i} className="border-l-2 pl-3" style={{ borderColor: `${accent}44` }}>
                  <div className="flex justify-between items-baseline">
                    <div className="font-bold">{exp.role || "Role"}</div>
                    <div className="text-xs text-slate-500">{exp.dates}</div>
                  </div>
                  {exp.company && <div className="text-sm font-medium" style={{ color: accent }}>{exp.company}</div>}
                  {exp.bullets && (
                    <ul className="list-disc pl-5 mt-1 space-y-0.5 text-sm text-slate-700">
                      {exp.bullets.split("\n").filter((b) => b.trim()).map((b, bi) => (
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
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>Education</h2>
              <div className="space-y-2">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <div className="font-bold text-sm">{edu.school || "School"}</div>
                    {edu.degree && <div className="text-xs text-slate-600">{edu.degree}</div>}
                    {edu.year && <div className="text-xs text-slate-400">{edu.year}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}
          {data.skills && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>Skills</h2>
              <div className="text-sm text-slate-700 whitespace-pre-wrap">{data.skills}</div>
            </section>
          )}
        </div>
        {data.languages && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>Languages</h2>
            <p className="text-sm text-slate-700">{data.languages}</p>
          </section>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   CREATIVE — bold photo, playful
   ============================================================ */
function CreativeTemplate({
  data,
  id,
  accent,
}: {
  data: CVData;
  id: string;
  accent: string;
}) {
  return (
    <div id={id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Left color bar with photo */}
      <div className="flex">
        <div className="w-1/3 p-6 text-white" style={{ background: accent }}>
          {data.photo && (
            <img src={data.photo} alt="" className="w-32 h-32 rounded-full object-cover border-4 border-white/40 mx-auto mb-4" />
          )}
          <div className="text-center">
            <h1 className="text-xl font-extrabold leading-tight">{data.fullName || "Your Name"}</h1>
          </div>
          <div className="mt-6 space-y-2 text-xs text-white/90">
            {data.email && <div className="break-all">✉ {data.email}</div>}
            {data.phone && <div>☎ {data.phone}</div>}
            {data.location && <div>📍 {data.location}</div>}
          </div>
          {data.skills && (
            <div className="mt-6">
              <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-white/80">Skills</div>
              <div className="text-xs whitespace-pre-wrap leading-relaxed">{data.skills}</div>
            </div>
          )}
          {data.languages && (
            <div className="mt-6">
              <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-white/80">Languages</div>
              <div className="text-xs whitespace-pre-wrap">{data.languages}</div>
            </div>
          )}
        </div>

        <div className="flex-1 p-6 space-y-5">
          {data.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>About</h2>
              <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
            </section>
          )}
          {data.experience.some((e) => e.role || e.company) && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>Experience</h2>
              <div className="space-y-4">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="font-bold text-slate-900">{exp.role || "Role"}</div>
                    <div className="text-xs text-slate-500">{exp.company} · {exp.dates}</div>
                    {exp.bullets && (
                      <ul className="list-disc pl-5 mt-1 space-y-0.5 text-sm text-slate-700">
                        {exp.bullets.split("\n").filter((b) => b.trim()).map((b, bi) => (
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
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>Education</h2>
              <div className="space-y-2">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <div className="font-bold text-sm">{edu.school || "School"}</div>
                    {edu.degree && <div className="text-xs text-slate-600">{edu.degree}</div>}
                    {edu.year && <div className="text-xs text-slate-400">{edu.year}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TWO-COLUMN — sidebar on right
   ============================================================ */
function TwoColumnTemplate({
  data,
  id,
  accent,
}: {
  data: CVData;
  id: string;
  accent: string;
}) {
  return (
    <div id={id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex">
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-extrabold" style={{ color: accent }}>{data.fullName || "Your Name"}</h1>
          <div className="text-xs text-slate-600 mt-2 mb-5">
            {data.email && <div>✉ {data.email}</div>}
            {data.phone && <div>☎ {data.phone}</div>}
            {data.location && <div>📍 {data.location}</div>}
          </div>

          {data.summary && (
            <section className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>Summary</h2>
              <p className="text-sm leading-relaxed text-slate-700">{data.summary}</p>
            </section>
          )}
          {data.experience.some((e) => e.role || e.company) && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>Experience</h2>
              <div className="space-y-4">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="font-bold text-slate-900">{exp.role || "Role"}</div>
                    <div className="text-xs text-slate-500">{exp.company} · {exp.dates}</div>
                    {exp.bullets && (
                      <ul className="list-disc pl-5 mt-1 space-y-0.5 text-sm text-slate-700">
                        {exp.bullets.split("\n").filter((b) => b.trim()).map((b, bi) => (
                          <li key={bi}>{b.replace(/^[-•*]\s*/, "")}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="w-1/3 bg-slate-50 p-6 space-y-5">
          {data.skills && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>Skills</h2>
              <div className="text-sm text-slate-700 whitespace-pre-wrap">{data.skills}</div>
            </section>
          )}
          {data.education.some((e) => e.school) && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>Education</h2>
              <div className="space-y-2">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <div className="font-bold text-sm">{edu.school || "School"}</div>
                    {edu.degree && <div className="text-xs text-slate-600">{edu.degree}</div>}
                    {edu.year && <div className="text-xs text-slate-400">{edu.year}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}
          {data.languages && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>Languages</h2>
              <p className="text-sm text-slate-700">{data.languages}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   COMPACT — 1-page dense
   ============================================================ */
function CompactTemplate({
  data,
  id,
  accent,
}: {
  data: CVData;
  id: string;
  accent: string;
}) {
  return (
    <div id={id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-slate-900" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex justify-between items-baseline pb-3 mb-3" style={{ borderBottom: `2px solid ${accent}` }}>
        <h1 className="text-2xl font-extrabold">{data.fullName || "Your Name"}</h1>
        <div className="text-[11px] text-slate-600 text-right">
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.location && <div>{data.location}</div>}
        </div>
      </div>
      {data.summary && (
        <p className="text-xs leading-relaxed text-slate-700 mb-3">{data.summary}</p>
      )}
      {data.experience.some((e) => e.role || e.company) && (
        <section className="mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>Experience</h2>
          <div className="space-y-3">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs">
                  <span className="font-bold">{exp.role || "Role"}</span>
                  <span className="text-slate-500">{exp.dates}</span>
                </div>
                {exp.company && <div className="text-[11px] text-slate-500 italic">{exp.company}</div>}
                {exp.bullets && (
                  <ul className="list-disc pl-4 mt-0.5 text-[11px] text-slate-700">
                    {exp.bullets.split("\n").filter((b) => b.trim()).map((b, bi) => (
                      <li key={bi}>{b.replace(/^[-•*]\s*/, "")}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      <div className="grid grid-cols-2 gap-4 text-xs">
        {data.education.some((e) => e.school) && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: accent }}>Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-1">
                <div className="font-semibold text-[11px]">{edu.school}</div>
                <div className="text-[10px] text-slate-600">{edu.degree} · {edu.year}</div>
              </div>
            ))}
          </div>
        )}
        {data.skills && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: accent }}>Skills</h2>
            <div className="text-[11px] text-slate-700">{data.skills}</div>
          </div>
        )}
      </div>
      {data.languages && (
        <div className="mt-3 text-[11px]">
          <span className="font-bold uppercase tracking-wider" style={{ color: accent }}>Languages: </span>
          <span className="text-slate-700">{data.languages}</span>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ELEGANT — photo, refined serif with accent line
   ============================================================ */
function ElegantTemplate({
  data,
  id,
  accent,
}: {
  data: CVData;
  id: string;
  accent: string;
}) {
  return (
    <div id={id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-slate-900" style={{ fontFamily: "Georgia, serif" }}>
      <div className="p-8 text-center" style={{ borderBottom: `3px solid ${accent}` }}>
        {data.photo && (
          <img src={data.photo} alt="" className="w-28 h-28 rounded-full object-cover mx-auto mb-4" style={{ border: `3px solid ${accent}` }} />
        )}
        <h1 className="text-3xl font-bold">{data.fullName || "Your Name"}</h1>
        <div className="text-xs text-slate-600 mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>· {data.phone}</span>}
          {data.location && <span>· {data.location}</span>}
        </div>
      </div>

      <div className="p-8 space-y-5">
        {data.summary && (
          <section>
            <p className="text-sm leading-relaxed text-slate-700 text-center italic">{data.summary}</p>
          </section>
        )}
        {data.experience.some((e) => e.role || e.company) && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-center mb-4" style={{ color: accent }}>Experience</h2>
            <div className="space-y-5">
              {data.experience.map((exp, i) => (
                <div key={i} className="text-center">
                  <div className="font-bold">{exp.role || "Role"}</div>
                  <div className="text-sm italic text-slate-600">{exp.company} · {exp.dates}</div>
                  {exp.bullets && (
                    <ul className="text-sm text-slate-700 mt-2 space-y-0.5">
                      {exp.bullets.split("\n").filter((b) => b.trim()).map((b, bi) => (
                        <li key={bi}>{b.replace(/^[-•*]\s*/, "")}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        <div className="grid grid-cols-2 gap-6 pt-4" style={{ borderTop: `1px solid ${accent}33` }}>
          {data.education.some((e) => e.school) && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: accent }}>Education</h2>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-2">
                  <div className="font-bold text-sm">{edu.school}</div>
                  <div className="text-xs text-slate-600">{edu.degree} · {edu.year}</div>
                </div>
              ))}
            </section>
          )}
          {data.skills && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: accent }}>Skills</h2>
              <div className="text-sm text-slate-700 whitespace-pre-wrap">{data.skills}</div>
            </section>
          )}
        </div>
        {data.languages && (
          <div className="text-center text-xs text-slate-600">{data.languages}</div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   BOLD — big color blocks, photo right
   ============================================================ */
function BoldTemplate({
  data,
  id,
  accent,
}: {
  data: CVData;
  id: string;
  accent: string;
}) {
  return (
    <div id={id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex items-stretch">
        <div className="flex-1 p-8" style={{ background: `${accent}10` }}>
          <h1 className="text-4xl font-black leading-tight" style={{ color: accent }}>
            {data.fullName || "Your Name"}
          </h1>
          <div className="text-sm text-slate-700 mt-3 space-y-1">
            {data.email && <div>✉ {data.email}</div>}
            {data.phone && <div>☎ {data.phone}</div>}
            {data.location && <div>📍 {data.location}</div>}
          </div>
          {data.summary && (
            <p className="text-sm leading-relaxed text-slate-700 mt-5">{data.summary}</p>
          )}
        </div>
        {data.photo && (
          <div className="w-1/3" style={{ background: accent }}>
            <img src={data.photo} alt="" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <div className="p-8 space-y-5">
        {data.experience.some((e) => e.role || e.company) && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: accent }}>Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <div className="font-bold text-slate-900">{exp.role || "Role"}</div>
                    <div className="text-xs text-slate-500">{exp.dates}</div>
                  </div>
                  <div className="text-sm text-slate-600">{exp.company}</div>
                  {exp.bullets && (
                    <ul className="list-disc pl-5 mt-1 space-y-0.5 text-sm text-slate-700">
                      {exp.bullets.split("\n").filter((b) => b.trim()).map((b, bi) => (
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
              <h2 className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: accent }}>Education</h2>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-2">
                  <div className="font-bold text-sm">{edu.school}</div>
                  <div className="text-xs text-slate-600">{edu.degree}</div>
                  <div className="text-xs text-slate-400">{edu.year}</div>
                </div>
              ))}
            </section>
          )}
          {data.skills && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: accent }}>Skills</h2>
              <div className="text-sm text-slate-700 whitespace-pre-wrap">{data.skills}</div>
            </section>
          )}
        </div>
        {data.languages && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: accent }}>Languages</h2>
            <p className="text-sm text-slate-700">{data.languages}</p>
          </section>
        )}
      </div>
    </div>
  );
}