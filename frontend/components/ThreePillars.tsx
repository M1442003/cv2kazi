import Link from "next/link";

const PILLARS = [
  {
    n: "1",
    tag: "CREATE",
    tagColor: "bg-brand-red/10 text-brand-red",
    title: "Build a CV from scratch",
    body: "No CV yet? Answer a few questions and we'll generate a professional, recruiter-ready CV in minutes.",
    features: [
      "5+ professional templates",
      "Swahili & English",
      "Export to PDF / DOCX",
      "Job-specific tailoring",
    ],
    cta: "Start Building",
    href: "/create",
  },
  {
    n: "2",
    tag: "ANALYZE",
    tagColor: "bg-brand-lightblue/10 text-brand-lightblue",
    title: "Get instant AI feedback",
    body: "Upload your CV and get a 0-100 score plus a line-by-line AI review with Tanzania-specific tips.",
    features: [
      "Rule-based + AI score",
      "ATS compatibility check",
      "Job description match",
      "Missing keyword finder",
    ],
    cta: "Analyze Now",
    href: "/analyze",
  },
  {
    n: "3",
    tag: "MODIFY",
    tagColor: "bg-green-100 text-green-700",
    title: "Improve every line",
    body: "The AI rewrites weak bullets, suggests stronger verbs, and polishes your language — click by click.",
    features: [
      "AI bullet rewriting",
      "Action verb suggestions",
      "Grammar & tone polish",
      "Before / after preview",
    ],
       cta: "Rewrite Now",
       href: "/modify",
  },
];

export default function ThreePillars() {
  return (
    <section id="pillars" className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-block mb-3 px-4 py-1.5 bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-wider rounded-full">
            What You Can Do
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            One tool. Three superpowers.
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Create a CV. Analyze it. Improve it. Everything you need to land
            your next job — in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <div
              key={p.n}
              className="flex flex-col p-5 sm:p-7 rounded-2xl border-2 border-slate-100 hover:border-brand-red/40 hover:shadow-xl transition bg-white relative"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xl font-extrabold">
                  {p.n}
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${p.tagColor}`}
                >
                  {p.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {p.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                {p.body}
              </p>

              <ul className="space-y-2 mb-6 flex-1">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={p.href}
                className="block text-center bg-slate-900 hover:bg-brand-red text-white font-semibold px-5 py-3 rounded-full transition"
              >
                {p.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}