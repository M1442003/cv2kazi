"use client";
import { useRef, useState } from "react";

const MAX_MB = 5;

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function fileExt(name: string): string {
  return name.split(".").pop()?.toUpperCase() || "FILE";
}

export default function FileDropZone({
  file,
  onFileChange,
  label = "Your CV",
}: {
  file: File | null;
  onFileChange: (f: File | null) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  function pickFile(f: File | null | undefined) {
    if (!f) return;
    if (!/\.(pdf|docx)$/i.test(f.name)) {
      setError("Only PDF or DOCX files are allowed.");
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`File is too large. Max ${MAX_MB} MB.`);
      return;
    }
    setError("");
    onFileChange(f);
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
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={onInputChange}
        className="hidden"
      />

      {!file ? (
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

      {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
    </div>
  );
}
