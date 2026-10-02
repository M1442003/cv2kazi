const TESTIMONIALS = [
  {
    name: "Amina H.",
    role: "Fresh graduate · UDSM",
    quote:
      "I had no idea my CV was missing metrics. The AI told me exactly what to fix — got 3 interviews the following week.",
    initials: "AH",
  },
  {
    name: "Baraka M.",
    role: "Career changer · Arusha",
    quote:
      "The Tanzania-specific tips were the game-changer. I finally understood what local recruiters actually look for.",
    initials: "BM",
  },
  {
    name: "Fatma S.",
    role: "Software Engineer · Zanzibar",
    quote:
      "CV2Kazi found issues a paid consultant missed. Highly recommended.",
    initials: "FS",
  },
];

export default function Testimonials() {
  return (
    <section className="hidden sm:block bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-block mb-3 px-4 py-1.5 bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-wider rounded-full">
            Loved by Job Seekers
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Real feedback. Real results.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="p-6 rounded-2xl border border-slate-200 bg-brand-cream"
            >
              <div className="text-4xl text-brand-red mb-3">"</div>
              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center text-sm font-bold">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}