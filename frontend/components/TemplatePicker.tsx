"use client";
import {
  type TemplateId,
  type TemplateColorId,
  TEMPLATE_COLORS,
} from "./CVPreview";
import CVPreview from "./CVPreview";
import { SAMPLE_CV } from "./sampleCVData";

const TEMPLATES: {
  id: TemplateId;
  name: string;
  tagline: string;
}[] = [
  {
    id: "classic",
    name: "Classic",
    tagline: "Traditional · safest for conservative roles",
  },
  {
    id: "modern",
    name: "Modern",
    tagline: "Colored header · great for tech & startups",
  },
  {
    id: "minimal",
    name: "Minimal",
    tagline: "Clean · elegant · everything or nothing",
  },
];

const COLOR_IDS = Object.keys(TEMPLATE_COLORS) as TemplateColorId[];

export default function TemplatePicker({
  value,
  onChange,
  color,
  onColorChange,
}: {
  value: TemplateId;
  onChange: (id: TemplateId) => void;
  color: TemplateColorId;
  onColorChange: (c: TemplateColorId) => void;
}) {
  return (
    <div className="mb-6">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
        Choose a template
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {TEMPLATES.map((t) => {
          const active = value === t.id;
          return (
            <div
              key={t.id}
              className={`rounded-2xl border bg-white p-4 transition shadow-sm ${
                active
                  ? "border-brand-red shadow-md ring-2 ring-brand-red/20"
                  : "border-slate-200 hover:shadow-md hover:border-slate-300"
              }`}
            >
              {/* Template preview (click to select) */}
              <button
                type="button"
                onClick={() => onChange(t.id)}
                className="block w-full text-left"
              >
                <div className="relative w-full aspect-[3/4] bg-white rounded-lg overflow-hidden border border-slate-200 group">
                  <div
                    className="absolute top-0 left-0"
                    style={{
                      width: "250%",
                      height: "250%",
                      transform: "scale(0.4)",
                      transformOrigin: "top left",
                      pointerEvents: "none",
                    }}
                  >
                    <CVPreview
                      data={SAMPLE_CV}
                      template={t.id}
                      id={`tpl-preview-${t.id}`}
                      color={color}
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="w-5 h-5"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
                      </svg>
                    </div>
                  </div>

                  {/* Selected badge */}
                  {active && (
                    <div className="absolute top-2 right-2 bg-brand-red text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                      ✓ Selected
                    </div>
                  )}
                </div>
              </button>

              {/* Name + tagline */}
              <div className="mt-3 text-center">
                <div className="font-bold text-slate-900">{t.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {t.tagline}
                </div>
              </div>

              {/* Color dots */}
              <div className="mt-3 flex justify-center gap-2">
                {COLOR_IDS.map((cid) => {
                  const c = TEMPLATE_COLORS[cid];
                  const isActive = active && color === cid;
                  return (
                    <button
                      key={cid}
                      type="button"
                      onClick={() => {
                        onChange(t.id);
                        onColorChange(cid);
                      }}
                      aria-label={c.label}
                      title={c.label}
                      className={`w-5 h-5 rounded-full transition-all border-2 ${
                        isActive
                          ? "border-slate-900 scale-110"
                          : "border-transparent hover:scale-110"
                      }`}
                      style={{ background: c.hex }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}