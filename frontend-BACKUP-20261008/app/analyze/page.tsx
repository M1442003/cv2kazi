"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadForm from "@/components/UploadForm";

export default function AnalyzePage() {
  const [result, setResult] = useState<any>(null);

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link
          href="/"
          className="text-sm text-slate-500 hover:text-brand-red transition mb-4 inline-block"
        >
          🔙 Back to home
        </Link>

        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-900">
            Analyze Your CV
          </h1>
          <p className="text-slate-600">
            Upload your CV and paste a job description for tailored feedback.
          </p>
        </header>

        <UploadForm onResult={setResult} />

        {result && <Results data={result} />}
      </main>
      <Footer />
    </>
  );
}

function Results({ data }: { data: any }) {
  const rules = data.rule_based;
  const ai = data.ai_analysis || {};

  return (
    <div className="mt-8 space-y-6">
      {/* Rule-based */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-3 text-slate-900">
          Rule-based score: {rules.score}/100
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          {rules.word_count} words detected
        </p>
        <ul className="text-sm space-y-1.5">
          {Object.entries(rules.checks).map(([k, v]: any) => (
            <li key={k}>
              <span className="font-semibold capitalize text-slate-700">
                {k}:
              </span>{" "}
              <span
                className={
                  v[0] === "good"
                    ? "text-green-700"
                    : v[0] === "missing"
                    ? "text-red-600"
                    : "text-amber-600"
                }
              >
                {v[0]}
              </span>
              {v[1] && <span className="text-slate-500"> — {v[1]}</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* AI */}
      {ai.overall_score !== undefined && (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900">
            AI score: {ai.overall_score}/100
          </h2>
          <p className="text-slate-700 leading-relaxed">{ai.summary}</p>

          {ai.strengths?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-slate-900">
                Strengths
              </h3>
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
                {ai.strengths.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {ai.weaknesses?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-slate-900">
                Weaknesses
              </h3>
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
                {ai.weaknesses.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {ai.improvements?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-slate-900">
                Improvements
              </h3>
              <ul className="space-y-3 text-sm">
                {ai.improvements.map((imp: any, i: number) => (
                  <li
                    key={i}
                    className="border-l-4 border-brand-red pl-4 py-1"
                  >
                    <b className="text-slate-900">{imp.section}:</b>{" "}
                    <span className="text-slate-700">{imp.issue}</span>
                    <br />
                    <span className="text-green-700">{imp.fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {ai.tanzania_specific_tips?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-slate-900">
                🇹🇿 Tanzania-specific tips
              </h3>
              <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
                {ai.tanzania_specific_tips.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {ai.rewritten_summary && (
            <div className="bg-green-50 p-5 rounded-xl border border-green-200">
              <h3 className="font-semibold mb-2 text-slate-900">
                 Rewritten summary
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {ai.rewritten_summary}
              </p>
            </div>
          )}
        </section>
      )}

      {ai.error && (
        <section className="bg-red-50 border border-red-200 p-4 rounded-xl text-sm text-red-700">
          AI analysis unavailable: {ai.error}
        </section>
      )}

      {/* ⬇️ This block is now INSIDE the return, above </div> */}
      {(rules || ai.overall_score !== undefined) && (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
          <div className="text-4xl mb-2"></div>
          <h3 className="font-bold text-lg text-slate-900 mb-1">
            Ready to find matching jobs?
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            We'll match your CV against real Tanzanian jobs and show you what's
            missing.
          </p>
          <Link
            href="/jobs"
            className="inline-block bg-brand-lightblue hover:bg-brand-blue text-white font-bold px-8 py-3 rounded-full transition shadow-sm"
          >
            Find Jobs Matching CV
          </Link>
        </section>
      )}
    </div>
  );
}