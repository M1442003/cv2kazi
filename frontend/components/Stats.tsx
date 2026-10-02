const STATS = [
  { value: "5,000+", label: "CVs analyzed" },
  { value: "82%", label: "Average score improvement" },
  { value: "3 min", label: "Average fix time" },
  { value: "100%", label: "Free to start" },
];

export default function Stats() {
  return (
    <section className="hidden sm:block bg-slate-900 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2">
              {s.value}
            </div>
            <div className="text-sm text-slate-400 uppercase tracking-wider font-semibold">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}