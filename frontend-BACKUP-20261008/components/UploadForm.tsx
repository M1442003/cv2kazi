"use client";
import { useRef, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const MAX_MB = 5;

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function fileExt(name: string): string {
  return name.split(".").pop()?.toUpperCase() || "FILE";
}

export default function UploadForm({
  onResult,
}: {
  onResult: (data: any) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function pickFile(f: File | null | undefined) {
    if (!f) return;

    // Validate type
    if (!/\.(pdf|docx)$/i.test(f.name)) {
      setError("Only PDF or DOCX files are allowed.");
      return;
    }
    // Validate size
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`File is too large. Max ${MAX_MB} MB.`);
      return;
    }
    setError("");
    setFile(f);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    pickFile(e.target.files?.[0]);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  }

  function removeFile() {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Please choose a CV file first.");
      return;
    }
    setLoading(true);
    setError("");

    const fd = new FormData();
    fd.append("file", file);
    fd.append("job_description", jd);

    try {
      const res = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Analysis failed");
      onResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
    >
      {/* ---- File upload ---- */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Your CV
        </label>

        {/* Hidden native input */}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={onInputChange}
          className="hidden"
        />

        {!file ? (
          /* ---------- Empty state: drop zone ---------- */
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${
              dragging
                ? "border-brand-red bg-brand-red/5"
                : "border-slate-300 hover:border-brand-red hover:bg-slate-50"
            }`}
          >
            <div className="text-4xl mb-3">📄</div>
            <div className="font-semibold text-slate-800">
              Drag & drop your CV here
            </div>
            <div className="text-sm text-slate-500 mt-1">
              or{" "}
              <span className="text-brand-red font-semibold underline">
                click to browse
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-3">
              PDF or DOCX · max {MAX_MB} MB
            </div>
          </div>
        ) : (
          /* ---------- Attached state: file card ---------- */
          <div className="rounded-2xl border-2 border-brand-red/30 bg-brand-red/5 p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-red text-white flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold">{fileExt(file.name)}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-900 truncate">
                {file.name}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {humanSize(file.size)} · {fileExt(file.name)}
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              aria-label="Remove file"
              className="w-8 h-8 rounded-full hover:bg-brand-red/10 text-slate-500 hover:text-brand-red transition flex items-center justify-center text-lg"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* ---- Job description ---- */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Job description{" "}
          <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the job ad here for tailored feedback..."
          rows={4}
          className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
        />
      </div>

      {/* ---- Submit ---- */}
      <button
        type="submit"
        disabled={!file || loading}
        className="w-full bg-brand-red hover:bg-brand-darkred text-white font-bold px-6 py-3 rounded-full transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Analyzing…" : "Analyze CV →"}
      </button>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-xl">
          {error}
        </p>
      )}
    </form>
  );
}