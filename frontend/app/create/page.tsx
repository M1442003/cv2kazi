"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CVBuilder, { CVData, EMPTY_CV } from "@/components/CVBuilder";
import CVPreview, {
  TemplateId,
  TemplateColorId,
} from "@/components/CVPreview";
import TemplatePicker from "@/components/TemplatePicker";
import { useEffect } from "react";

// Load html2pdf dynamically (client-only)
const downloadPdf = async (elementId: string, fileName: string) => {
  const html2pdf = (await import("html2pdf.js")).default;
  const el = document.getElementById(elementId);
  if (!el) return;

  await html2pdf()
    .set({
      margin: 0,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    })
    .from(el)
    .save();
};

export default function CreatePage() {
  const [step, setStep] = useState<"pick" | "build">("pick");
  const [data, setData] = useState<CVData>(EMPTY_CV);
  const [template, setTemplate] = useState<TemplateId>("classic");
  const [color, setColor] = useState<TemplateColorId>("red");
  
  useEffect(() => {
    const saved = localStorage.getItem("cv2kazi_improved_cv");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
        setStep("build");
        localStorage.removeItem("cv2kazi_improved_cv");
      } catch {}
    }
  }, []);

  function printCV() {
    window.print();
  }

  function getFileName() {
    const safeName =
      (data.fullName || "MyCV").replace(/[^a-zA-Z0-9-_ ]/g, "").trim() ||
      "MyCV";
    return `${safeName}-CV2Kazi.pdf`;
  }

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      
        {/* ═══════ STEP 1 — Pick a template ═══════ */}
        {step === "pick" && (
          <>
            <header className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-900">
                Build Your CV
              </h1>
              <p className="text-slate-600">
                Pick a template, choose a color, then fill in your details.
              </p>
            </header>

            {/* Template picker with previews + color dots */}
            <TemplatePicker
              value={template}
              onChange={setTemplate}
              color={color}
              onColorChange={setColor}
            />

            {/* Full-size preview of selected template */}
            <div className="mt-8 mb-8">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Live Preview · {template} · {color}
              </div>
              <div className="max-w-2xl mx-auto">
                <CVPreview data={data} template={template} color={color} />
              </div>
            </div>

            {/* Big CTA to continue */}
            <div className="text-center mt-10">
              <button
                onClick={() => setStep("build")}
                className="bg-brand-red hover:bg-brand-darkred text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-brand-red/30 transition text-base"
              >
                Build Now
              </button>
              <p className="text-xs text-slate-500 mt-3">
                You can change the template anytime.
              </p>
            </div>
          </>
        )}

        {/* ═══════ STEP 2 — Fill in details ═══════ */}
        {step === "build" && (
          <>
            <header className="mb-6">
              <button
                onClick={() => setStep("pick")}
                className="text-sm text-slate-500 hover:text-brand-red transition mb-3 inline-block"
              >
                 Back to Templates
              </button>
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-900">
                Your Details
              </h1>
              <p className="text-slate-600">
                Fill in the fields below. Watch your CV update in real time.
              </p>
            </header>

            {/* Compact template switcher */}
            <div className="mb-6">
              <TemplatePicker
                value={template}
                onChange={setTemplate}
                color={color}
                onColorChange={setColor}
              />
            </div>

            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap gap-3">
              <button
                onClick={() => downloadPdf("cv-preview", getFileName())}
                className="bg-brand-red hover:bg-brand-darkred text-white font-semibold px-6 py-2.5 rounded-full transition shadow-sm"
              >
                Download PDF
              </button>
              <button
                onClick={printCV}
                className="hidden sm:inline-block border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-6 py-2.5 rounded-full transition"
              >
                Print
              </button>
              <button
                onClick={() => setData(EMPTY_CV)}
                className="border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-6 py-2.5 rounded-full transition"
              >
                Clear all
              </button>
            </div>

            {/* Form + Preview side by side */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <CVBuilder data={data} onChange={setData} />
              </div>
              <div className="lg:sticky lg:top-24 self-start">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Live Preview · {template}
                </div>
                <CVPreview data={data} template={template} color={color} />
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />

      {/* Print-only: show only the CV */}
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