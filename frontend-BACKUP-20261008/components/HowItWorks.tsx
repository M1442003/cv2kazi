import Link from "next/link";

const STEPS = [
  {
    n: "1",
    title: "Upload your CV",
    body: "Drag and drop your PDF or DOCX file. We never store it — analysis happens instantly.",
  },
  {
    n: "2",
    title: "Get your score",
    body: "In ~10 seconds you'll get a rule-based score plus a deep AI analysis with strengths, weaknesses, and specific fixes.",
  },
  {
    n: "3",
    title: "Improve & apply",
    body: "Apply the improvements we suggest, re-upload, and watch your score climb before you send it off.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-brand-cream py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-block mb-3 px-4 py-1.5 bg-brand-lightblue/10 text-brand-lightblue text-xs font-bold uppercase tracking-wider rounded-full">
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Three steps to a stronger CV
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            It takes less time than brewing a cup of chai.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <div key={s.n} className="relative">
              <div className="w-14 h-14 rounded-2xl bg-brand-red text-white flex items-center justify-center text-2xl font-extrabold mb-4 shadow-lg shadow-brand-red/20">
                {s.n}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {s.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/analyze"
            className="inline-block bg-brand-red hover:bg-brand-darkred text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-brand-red/30 transition"
          >
            Try It Free →
          </Link>
        </div>
      </div>
    </section>
  );
}