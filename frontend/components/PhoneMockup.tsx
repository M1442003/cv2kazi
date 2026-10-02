export default function PhoneMockup() {
  return (
    <div className="relative w-[260px] sm:w-[280px] md:w-[300px]">
      {/* Outer frame — thick black bezel */}
      <div className="relative bg-slate-900 rounded-[2.8rem] p-2 shadow-2xl shadow-slate-900/30">
        {/* Side buttons (left) */}
        <div className="absolute left-0 top-24 -translate-x-1 w-1 h-8 bg-slate-800 rounded-l" />
        <div className="absolute left-0 top-36 -translate-x-1 w-1 h-12 bg-slate-800 rounded-l" />
        <div className="absolute left-0 top-52 -translate-x-1 w-1 h-12 bg-slate-800 rounded-l" />
        {/* Side button (right) */}
        <div className="absolute right-0 top-32 translate-x-1 w-1 h-16 bg-slate-800 rounded-r" />

        {/* Inner bezel ring */}
        <div className="bg-slate-950 rounded-[2.4rem] p-1">
          {/* Screen */}
          <div className="bg-white rounded-[2.2rem] overflow-hidden aspect-[9/19.5] relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-950 rounded-b-2xl z-20" />

            {/* Screen content */}
            <div className="h-full flex flex-col pt-8 pb-3 px-4 overflow-hidden">
              {/* Status bar */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 px-1 mb-3 font-medium">
                <span>9:41</span>
                <span className="flex items-center gap-1">
                  <span>●●●●</span>
                  <span>5G</span>
                  <span>🔋</span>
                </span>
              </div>

              {/* App header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-brand-red flex items-center justify-center text-white text-[9px] font-extrabold shrink-0">
                  C2K
                </div>
                <div className="leading-tight">
                  <div className="text-[10px] font-extrabold text-slate-900">
                    CV2Kazi
                  </div>
                  <div className="text-[6px] text-slate-400 tracking-wide">
                    From good CV to getting a job
                  </div>
                </div>
              </div>

              {/* Score card */}
              <div className="bg-brand-cream rounded-xl p-3 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                    Your Score
                  </div>
                  <div className="text-[7px] font-semibold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
                    Analyzing…
                  </div>
                </div>

                <div className="text-2xl font-extrabold text-brand-red leading-none">
                  84<span className="text-xs text-slate-400">/100</span>
                </div>
                <div className="text-[8px] text-slate-500 mt-1 mb-2.5">
                  Great CV — 3 quick fixes
                </div>

                <div className="space-y-1.5">
                  {[
                    { label: "Structure", score: 92 },
                    { label: "Impact", score: 68 },
                    { label: "Tanzania Fit", score: 95 },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between text-[7px] font-medium text-slate-600 mb-0.5">
                        <span>{row.label}</span>
                        <span>{row.score}%</span>
                      </div>
                      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-red rounded-full"
                          style={{ width: `${row.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fake CTA inside phone */}
              <div className="mt-3 bg-brand-red text-white text-center text-[9px] font-bold py-2 rounded-full">
                Analyze My CV →
              </div>

              {/* Bottom home indicator */}
              <div className="mt-auto pt-3 flex justify-center">
                <div className="w-16 h-1 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
