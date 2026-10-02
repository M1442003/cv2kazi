"use client";
import type { TemplateId } from "./CVPreview";
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

export default function TemplatePicker({
  value,
  onChange,
}: {
  value: TemplateId;
  onChange: (id: TemplateId) => void;
}) {
  return (
    <div className="mb-6">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
        Choose a template
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TEMPLATES.map((t) => {
          const active = value === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={`group text-left rounded-2xl border-2 p-3 transition ${
                active
                  ? "border-brand-red bg-brand-red/5 shadow-md"
                  : "border-slate-200 hover:border-slate-300 bg-white hover:shadow-md"
              }`}
            >
              {/* Mini real preview, scaled down */}
              <div className="relative w-full aspect-[3/4] bg-white rounded-lg mb-3 overflow-hidden border border-slate-200">
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
                  />
                </div>

                {active && (
                  <div className="absolute top-2 right-2 bg-brand-red text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    ✓ Selected
                  </div>
                )}
              </div>

              <div className="text-sm font-bold text-slate-900">{t.name}</div>
              <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                {t.tagline}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}