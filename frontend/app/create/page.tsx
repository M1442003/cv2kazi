"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CVBuilder, { CVData, EMPTY_CV } from "@/components/CVBuilder";
import CVPreview, { TemplateId } from "@/components/CVPreview";
import TemplatePicker from "@/components/TemplatePicker";

export default function CreatePage() {
  const [data, setData] = useState<CVData>(EMPTY_CV);
  const [template, setTemplate] = useState<TemplateId>("classic");

  function printCV() {
    window.print();
  }

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link
          href="/"
          className="text-sm text-slate-500 hover:text-brand-red transition mb-4 inline-block"
        >
           🔙 Back to home
        </Link>

        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-900">
            Build Your CV
          </h1>
          <p className="text-slate-600">
            Pick a template, fill in your details, and download a polished CV.
          </p>
        </header>

        {/* Template picker */}
        <TemplatePicker value={template} onChange={setTemplate} />

        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={printCV}
            className="bg-brand-red hover:bg-brand-darkred text-white font-semibold px-6 py-2.5 rounded-full transition shadow-sm"
          >
            📄 Print / Save as PDF
          </button>
          <button
            onClick={() => setData(EMPTY_CV)}
            className="border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-6 py-2.5 rounded-full transition"
          >
            Clear all
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <CVBuilder data={data} onChange={setData} />
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Live Preview · {template}
            </div>
            <CVPreview data={data} template={template} />
          </div>
        </div>
      </main>

      <Footer />

      {/* Print-only: show only CV */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #cv-preview,
          #cv-preview * {
            visibility: visible;
          }
          #cv-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none;
            border: none;
            border-radius: 0;
            padding: 0.75in;
          }
        }
      `}</style>
    </>
  );
}