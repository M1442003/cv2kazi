"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CVPreview, { TemplateId, TemplateColorId } from "@/components/CVPreview";
import type { CVData } from "@/components/CVBuilder";
import FileDropZone from "@/components/FileDropZone";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ImprovePage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [improved, setImproved] = useState<CVData | null>(null);
  const [template] = useState<TemplateId>("executive");
  const [color] = useState<TemplateColorId>("red");

  async function improve(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Please upload your CV first.");
      return;
    }
    setLoading(true);
    setError("");
    setImproved(null);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch(`${API_URL}/improve`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Improve failed");

      const cv: CVData = {
        fullName: data.cv.fullName || "",
        email: data.cv.email || "",
        phone: data.cv.phone || "",
        location: data.cv.location || "",
        photo: "",
        summary: data.cv.summary || "",
        experience: data.cv.experience?.length
          ? data.cv.experience
          : [{ role: "", company: "", dates: "", bullets: "" }],
        education: data.cv.education?.length
          ? data.cv.education
          : [{ school: "", degree: "", year: "" }],
        skills: data.cv.skills || "",
        languages: data.cv.languages || "",
      };
      setImproved(cv);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function downloadPdf() {
    const el = document.getElementById("cv-preview");
    if (!el) return;
    import("html2pdf.js").then((mod) => {
      const html2pdf = mod.default;
      html2pdf()
        .set({
          margin: [0.25, 0.25, 0.25, 0.25],
          filename: `${improved?.fullName || "Improved-CV"}-CV2Kazi.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        })
        .from(el)
        .save();
    });
  }

  function editInBuilder() {
    if (!improved) return;
    localStorage.setItem("cv2kazi_improved_cv", JSON.stringify(improved));
    router.push("/create?mode=improved");
  }

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        <header className="mb-8 text-center">
          <div className="inline-block mb-3 px-4 py-1.5 bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-wider rounded-full">
            Full CV Rewrite
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold mb-3 text-slate-900">
            Let AI rewrite your whole CV
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Upload your current CV. In seconds, we'll produce a polished,
            ATS-friendly, metric-driven version you can download.
          </p>
        </header>

        {!improved && (
          <form
            onSubmit={improve}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5 max-w-lg mx-auto"
          >
            <FileDropZone
              file={file}
              onFileChange={setFile}
              label="Upload your current CV"
            />

            <button
              type="submit"
              disabled={!file || loading}
              className="w-full bg-brand-red hover:bg-brand-darkred text-white font-bold py-3.5 rounded-full transition shadow-sm disabled:opacity-50"
            >
              {loading ? "Rewriting your CV…" : "Improve My CV"}
            </button>

            {loading && (
              <p className="text-xs text-slate-500 text-center">
                This usually takes 15–25 seconds. Don't refresh.
              </p>
            )}

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-xl">
                {error}
              </p>
            )}
          </form>
        )}

        {improved && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
              <div className="font-bold text-green-900 mb-1">
                Your improved CV is ready
              </div>
              <div className="text-sm text-green-700">
                Review it below, then download or edit further.
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={downloadPdf}
                className="bg-brand-red hover:bg-brand-darkred text-white font-semibold px-6 py-3 rounded-full transition shadow-sm"
              >
                Download PDF
              </button>
              <button
                onClick={editInBuilder}
                className="border border-slate-300 hover:border-brand-red hover:text-brand-red text-slate-700 font-semibold px-6 py-3 rounded-full transition"
              >
                Edit in Builder
              </button>

            </div>

            <div className="max-w-2xl mx-auto">
              <CVPreview data={improved} template={template} color={color} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
