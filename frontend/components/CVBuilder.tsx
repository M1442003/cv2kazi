"use client";
import { useState } from "react";

export type CVData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  photo?: string;
  summary: string;
  education: { school: string; degree: string; year: string }[];
  experience: {
    role: string;
    company: string;
    dates: string;
    bullets: string;
  }[];
  skills: string;
  languages: string;
};
export const EMPTY_CV: CVData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  photo: "",
  summary: "",
  education: [{ school: "", degree: "", year: "" }],
  experience: [{ role: "", company: "", dates: "", bullets: "" }],
  skills: "",
  languages: "",
};

export default function CVBuilder({
  data,
  onChange,
}: {
  data: CVData;
  onChange: (d: CVData) => void;
}) {
  function set<K extends keyof CVData>(key: K, value: CVData[K]) {
    onChange({ ...data, [key]: value });
  }

  // --- Education helpers ---
  function setEdu(i: number, key: string, value: string) {
    const next = [...data.education];
    next[i] = { ...next[i], [key]: value };
    onChange({ ...data, education: next });
  }
  function addEdu() {
    onChange({
      ...data,
      education: [...data.education, { school: "", degree: "", year: "" }],
    });
  }
  function removeEdu(i: number) {
    onChange({
      ...data,
      education: data.education.filter((_, idx) => idx !== i),
    });
  }

  // --- Experience helpers ---
  function setExp(i: number, key: string, value: string) {
    const next = [...data.experience];
    next[i] = { ...next[i], [key]: value };
    onChange({ ...data, experience: next });
  }
  function addExp() {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { role: "", company: "", dates: "", bullets: "" },
      ],
    });
  }
  function removeExp(i: number) {
    onChange({
      ...data,
      experience: data.experience.filter((_, idx) => idx !== i),
    });
  }

  const inputCls =
    "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red";

  return (
    <div className="space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">

      {/* Contact */}
      <section>
        <h3 className="font-bold text-slate-900 mb-3">👤 Contact</h3>

        {/* Photo upload */}
        <div className="flex items-center gap-4 mb-4">
          {data.photo ? (
            <img
              src={data.photo}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-2xl text-slate-400">
              👤
            </div>
          )}
          <div>
            <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-full transition inline-block">
              {data.photo ? "Change photo" : "Upload photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const reader = new FileReader();
                  reader.onload = () => set("photo", reader.result as string);
                  reader.readAsDataURL(f);
                }}
              />
            </label>
            {data.photo && (
              <button
                type="button"
                onClick={() => set("photo", "")}
                className="ml-2 text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            )}
            <p className="text-xs text-slate-500 mt-1">
              Optional. Only used on templates with photo support.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <input
            placeholder="Full name"
            value={data.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            className={inputCls}
          />
          <input
            placeholder="Email"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputCls}
          />
          <input
            placeholder="Phone (e.g. +255 625 334 067)"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputCls}
          />
          <input
            placeholder="Location (e.g. Zanzibar, Tanzania)"
            value={data.location}
            onChange={(e) => set("location", e.target.value)}
            className={inputCls}
          />
        </div>
      </section>

      {/* Summary */}
      <section>
        <h3 className="font-bold text-slate-900 mb-3">Summary</h3>
        <textarea
          placeholder="2-3 sentences about your experience, skills, and what you're looking for..."
          value={data.summary}
          onChange={(e) => set("summary", e.target.value)}
          rows={3}
          className={inputCls}
        />
        <p className="text-xs text-slate-500 mt-1">
          Tip: mention your top skill + years of experience + what you want.
        </p>
      </section>

      {/* Experience */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-900"> Experience</h3>
          <button
            type="button"
            onClick={addExp}
            className="text-sm text-brand-red font-semibold hover:underline"
          >
            + Add experience
          </button>
        </div>
        <div className="space-y-4">
          {data.experience.map((exp, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative"
            >
              {data.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExp(i)}
                  className="absolute top-2 right-2 text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
              <div className="grid sm:grid-cols-3 gap-2 mb-2">
                <input
                  placeholder="Job title"
                  value={exp.role}
                  onChange={(e) => setExp(i, "role", e.target.value)}
                  className={inputCls}
                />
                <input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => setExp(i, "company", e.target.value)}
                  className={inputCls}
                />
                <input
                  placeholder="Dates (e.g. Jun 2023 – Aug 2023)"
                  value={exp.dates}
                  onChange={(e) => setExp(i, "dates", e.target.value)}
                  className={inputCls}
                />
              </div>
              <textarea
                placeholder="Bullet points — one per line. Add numbers! e.g. 'Reduced report time by 40%'"
                value={exp.bullets}
                onChange={(e) => setExp(i, "bullets", e.target.value)}
                rows={4}
                className={inputCls}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-900">Education</h3>
          <button
            type="button"
            onClick={addEdu}
            className="text-sm text-brand-red font-semibold hover:underline"
          >
            + Add education
          </button>
        </div>
        <div className="space-y-3">
          {data.education.map((edu, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative"
            >
              {data.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEdu(i)}
                  className="absolute top-2 right-2 text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
              <div className="grid sm:grid-cols-3 gap-2">
                <input
                  placeholder="School / University"
                  value={edu.school}
                  onChange={(e) => setEdu(i, "school", e.target.value)}
                  className={inputCls}
                />
                <input
                  placeholder="Degree / Certificate"
                  value={edu.degree}
                  onChange={(e) => setEdu(i, "degree", e.target.value)}
                  className={inputCls}
                />
                <input
                  placeholder="Year (e.g. 2020 – 2023)"
                  value={edu.year}
                  onChange={(e) => setEdu(i, "year", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Languages */}
      <section className="grid sm:grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold text-slate-900 mb-3"> Skills</h3>
          <textarea
            placeholder="Comma-separated: Python, React, SQL, Git..."
            value={data.skills}
            onChange={(e) => set("skills", e.target.value)}
            rows={3}
            className={inputCls}
          />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 mb-3"> Languages</h3>
          <textarea
            placeholder="e.g. Swahili (native), English (fluent)"
            value={data.languages}
            onChange={(e) => set("languages", e.target.value)}
            rows={3}
            className={inputCls}
          />
        </div>
      </section>
    </div>
  );
}