import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-28 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left — text */}
        <div>
          <div className="inline-block mb-4 px-3 sm:px-4 py-1.5 bg-brand-red/10 text-brand-red text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full">
            🇹🇿 Built for Tanzania
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
            Is your CV ready for the{" "}
            <span className="text-brand-red underline decoration-brand-red/30 decoration-4 underline-offset-4">
              Tanzanian job market
            </span>
            ?
          </h1>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
            Get instant, AI-powered feedback on your CV in seconds. Discover
            exactly what to fix — with tips specific to Tanzania — and land
            more interviews.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              href="/analyze"
              className="bg-brand-red hover:bg-brand-darkred text-white font-bold px-6 sm:px-8 py-3.5 rounded-full shadow-lg shadow-brand-red/30 transition text-center text-sm sm:text-base"
            >
              Analyze CV — Free
            </Link>
            <a
              href="#how"
              className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-6 sm:px-8 py-3.5 rounded-full transition text-center text-sm sm:text-base"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-6 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span>No signup required</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Your file stays private</span>
            </div>
          </div>
        </div>

        {/* Right — decorative card */}
        <div className="relative mt-8 md:mt-0">
          <div className="absolute -top-8 -right-8 w-48 sm:w-72 h-48 sm:h-72 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-48 sm:w-72 h-48 sm:h-72 bg-brand-lightblue/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative bg-white rounded-2xl shadow-2xl p-5 sm:p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                Your CV Score
              </div>
              <div className="text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full bg-green-100 text-green-700">
                Analyzing…
              </div>
            </div>

            <div className="text-4xl sm:text-5xl font-extrabold text-brand-red mb-2">
              84<span className="text-xl sm:text-2xl text-slate-400">/100</span>
            </div>

            <div className="space-y-3 mt-5 sm:mt-6">
              {[
                { label: "Structure & Format", score: 92 },
                { label: "Impact & Metrics", score: 68 },
                { label: "ATS Compatibility", score: 88 },
                { label: "Tanzania Fit", score: 95 },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-[10px] sm:text-xs font-medium text-slate-600 mb-1">
                    <span>{row.label}</span>
                    <span>{row.score}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-red rounded-full"
                      style={{ width: `${row.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 sm:mt-6 p-3 sm:p-4 bg-brand-cream rounded-xl border border-slate-100">
              <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Top Fix
              </div>
              <div className="text-xs sm:text-sm text-slate-700">
                Add metrics to your IPT entry — recruiters want numbers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}