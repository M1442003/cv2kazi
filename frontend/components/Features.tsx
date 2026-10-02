const FEATURES = [
  {
    icon: "",
    title: "AI-Powered Feedback",
    body: "Google Gemini analyzes your CV line-by-line and tells you exactly what to improve.",
  },
  {
    icon: "",
    title: "Tanzania-Specific Tips",
    body: "Advice tuned to what local recruiters in Dar, Dodoma, Arusha and Zanzibar actually look for.",
  },
  {
    icon: "",
    title: "Instant Scoring",
    body: "Get a 0-100 score with a breakdown by section — length, contact, experience, skills.",
  },
  {
    icon: "",
    title: "ATS Compatibility",
    body: "We check if your CV will pass automated screening systems used by many TZ employers.",
  },
  {
    icon: "",
    title: "Rewrite Suggestions",
    body: "Not just what's wrong — the AI rewrites your summary and weak bullets for you.",
  },
  {
    icon: "",
    title: "100% Free",
    body: "No signup, no credit card, no hidden fees. Upload your CV and get results in seconds.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-block mb-3 px-4 py-1.5 bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-wider rounded-full">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Everything you need to fix your CV
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Built by developers, for job seekers. No fluff — just the feedback
            that gets you hired.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-slate-200 hover:border-brand-red/40 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}