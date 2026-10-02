import Link from "next/link";
import PhoneMockup from "./PhoneMockup";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 md:py-20">

        {/* ═══════ MOBILE LAYOUT ═══════ */}
        <div className="md:hidden flex flex-col items-center text-center gap-6">

          {/* Badge */}
          <div className="inline-block px-3 py-1.5 bg-brand-red/10 text-brand-red text-[10px] font-bold uppercase tracking-wider rounded-full">
            🇹🇿 Built for Tanzania
          </div>

          {/* Phone */}
          <div className="relative flex justify-center">
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-brand-lightblue/10 rounded-full blur-3xl pointer-events-none" />
            <PhoneMockup />
          </div>

          {/* CTAs — stacked, full width */}
          <div className="w-full max-w-sm flex flex-col gap-3">
            <Link
              href="/analyze"
              className="bg-brand-red hover:bg-brand-darkred text-white font-bold py-3.5 rounded-full shadow-lg shadow-brand-red/30 transition text-center text-sm"
            >
              AnalyzeCV
            </Link>
            <Link
              href="/create"
              className="bg-white border-2 border-slate-300 hover:border-brand-red hover:text-brand-red text-slate-800 font-semibold py-3.5 rounded-full transition text-center text-sm"
            >
              Build CV
            </Link>
          </div>

          {/* Trust line */}
          <p className="text-xs text-slate-500">
            Free · No signup · Your file stays private
          </p>
        </div>

        {/* ═══════ DESKTOP LAYOUT ═══════ */}
        <div className="hidden md:grid md:grid-cols-2 gap-14 items-center">

          {/* Left — text */}
          <div>
            <div className="inline-block mb-4 px-3 py-1.5 bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-wider rounded-full">
              🇹🇿 Built for Tanzania
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] text-slate-900">
              From good CV to{" "}
              <span className="text-brand-red underline decoration-brand-red/30 decoration-4 underline-offset-4">
                getting a job
              </span>
            </h1>

            <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-md">
              Get instant, AI-powered feedback on your CV — plus templates,
              bullet rewriting, and real jobs in Tanzania.
            </p>

            <div className="mt-7 flex gap-3">
              <Link
                href="/analyze"
                className="bg-brand-red hover:bg-brand-darkred text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-brand-red/30 transition"
              >
                Analyze CV — Free
              </Link>
              <Link
                href="/create"
                className="bg-white border-2 border-slate-300 hover:border-brand-red hover:text-brand-red text-slate-800 font-semibold px-7 py-3.5 rounded-full transition"
              >
                Build CV — Free
              </Link>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Free · No signup · Your file stays private
            </p>
          </div>

          {/* Right — phone */}
          <div className="relative flex justify-center">
            <div className="absolute -top-8 -right-8 w-72 h-72 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-brand-lightblue/10 rounded-full blur-3xl pointer-events-none" />
            <PhoneMockup />
          </div>
        </div>

      </div>
    </section>
  );
}