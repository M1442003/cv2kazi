"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ModifyPage() {
  const [bullet, setBullet] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function rewrite() {
    if (!bullet.trim()) return;
    setLoading(true);
    setError("");
    setResult("");

    const fd = new FormData();
    fd.append("bullet", bullet);
    fd.append("job_context", context);

    try {
      const res = await fetch(`${API_URL}/rewrite`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Rewrite failed");
      setResult(data.rewritten);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function copyResult() {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  }

  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
 
        <header className="mb-8">
          <div className="inline-block mb-3 px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full">
            Modify
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-900">
            Rewrite Any CV Bullet
          </h1>
          <p className="text-slate-600">
            Paste a weak bullet from your CV. Our AI rewrites it to be stronger,
            more specific, and metric-driven.
          </p>
        </header>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">
              Your current bullet
            </label>
            <textarea
              placeholder="e.g. Worked on a customer-facing application"
              value={bullet}
              onChange={(e) => setBullet(e.target.value)}
              rows={3}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">
              Job context (optional)
            </label>
            <input
              placeholder="e.g. Software Engineer role at CRDB Bank"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
            />
          </div>

          <button
            onClick={rewrite}
            disabled={!bullet.trim() || loading}
            className="bg-brand-red hover:bg-brand-darkred text-white font-semibold px-6 py-2.5 rounded-full transition shadow-sm disabled:opacity-50"
          >
            {loading ? "Rewriting..." : " Rewrite it"}
          </button>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </p>
          )}
        </div>

        {result && (
          <div className="mt-6 bg-green-50 p-6 rounded-2xl border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900">Improved version</h3>
              <button
                onClick={copyResult}
                className="text-xs font-semibold text-green-700 hover:underline"
              >
                Copy to clipboard
              </button>
            </div>
            <p className="text-slate-800 leading-relaxed">{result}</p>
            <p className="text-xs text-slate-500 mt-4">
               Replace <code>[X]</code> and <code>[Y]</code> placeholders
              with real numbers from your work.
            </p>
          </div>
        )}

        <div className="mt-10 bg-brand-cream rounded-2xl p-6 border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-3">
             Tips for strong bullets
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>
              <b>Start with an action verb</b> — Engineered, Led, Built,
              Improved, Reduced
            </li>
            <li>
              <b>Include metrics</b> — numbers, %, TZS, team size, time
              saved
            </li>
            <li>
              <b>Say the impact</b> — what changed because of your work
            </li>
            <li>
              ❌ Avoid weak phrases — "Responsible for", "Helped with",
              "Worked on"
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}