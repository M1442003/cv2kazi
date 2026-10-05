"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  apply_url: string;
  match: {
    score: number;
    matched_keywords: string[];
    missing_keywords: string[];
  };
};

export default function JobsPage() {
  const [cvText, setCvText] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [error, setError] = useState("");

  async function findJobs(e: React.FormEvent) {
    e.preventDefault();
    if (!cvText.trim()) {
      setError("Please paste your CV text first.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/jobs/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv_text: cvText, location }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to find jobs");
      setJobs(data.jobs);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link
          href="/"
          className="text-sm text-slate-500 hover:text-brand-red transition mb-4 inline-block"
        >
          ← Back to home
        </Link>

        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-900">
            Jobs Matching Your CV
          </h1>
          <p className="text-slate-600">
            Paste your CV or a summary of your skills. We'll match you with
            real Tanzanian jobs and show you what's missing.
          </p>
        </header>

        {/* Input form */}
        <form
          onSubmit={findJobs}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 mb-8"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Paste your CV or skills summary
            </label>
            <textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="e.g. Software Engineer with 3 years experience in Python, React, Node.js. Built banking apps, worked with AWS and Docker..."
              rows={5}
              className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Location (optional)
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Dar es Salaam"
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!cvText.trim() || loading}
            className="w-full sm:w-auto bg-brand-red hover:bg-brand-darkred text-white font-bold px-8 py-3 rounded-full transition shadow-sm disabled:opacity-50"
          >
            {loading ? "Matching jobs…" : "🔍 Find Matching Jobs"}
          </button>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-xl">
              {error}
            </p>
          )}
        </form>

        {/* Results */}
        {jobs && jobs.length === 0 && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="text-4xl mb-3"></div>
            <div className="font-bold text-slate-900 mb-1">
              No matching jobs found
            </div>
            <div className="text-sm text-slate-500">
              Try adjusting the location filter or adding more skills.
            </div>
          </div>
        )}

        {jobs && jobs.length > 0 && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Found <b>{jobs.length}</b> matching jobs
              </div>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

function JobCard({ job }: { job: Job }) {
  const score = job.match.score;
  const scoreColor =
    score >= 70
      ? "text-green-700 bg-green-50 border-green-200"
      : score >= 45
      ? "text-amber-700 bg-amber-50 border-amber-200"
      : "text-red-700 bg-red-50 border-red-200";

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-brand-red/30 transition">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-lg text-slate-900">
              {job.title}
            </h3>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border ${scoreColor}`}
            >
              {score}% match
            </span>
          </div>
          <div className="text-sm text-slate-600 mt-1">
            <span className="font-semibold">{job.company}</span> ·{" "}
            {job.location} · {job.type}
          </div>
          <div className="text-xs text-slate-500 mt-1">
             {job.salary} · Posted {job.posted}
          </div>

          <p className="text-sm text-slate-700 mt-3 leading-relaxed">
            {job.description}
          </p>

          {job.match.missing_keywords.length > 0 && (
            <div className="mt-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Consider adding these to your CV
              </div>
              <div className="flex flex-wrap gap-1.5">
                {job.match.missing_keywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-1 rounded-full"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <a
          href={job.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-lightblue hover:bg-brand-blue text-white text-sm font-semibold px-5 py-2.5 rounded-full transition whitespace-nowrap self-start"
        >
          Apply Now →
        </a>
      </div>
    </div>
  );
}
