import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-brand-red py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 sm:w-96 h-64 sm:h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight">
          Ready to improve your CV?
        </h2>
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-red-100 max-w-xl mx-auto">
          It takes less than a minute. No signup. No credit card. Just upload
          and see what you're missing.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
          <Link
            href="/analyze"
            className="bg-white hover:bg-slate-100 text-brand-red font-bold px-6 sm:px-8 py-3.5 rounded-full transition shadow-lg text-sm sm:text-base"
          >
            Analyze CV — Free
          </Link>
          <Link
            href="/create"
            className="border-2 border-white/70 hover:bg-white/10 text-white font-semibold px-6 sm:px-8 py-3.5 rounded-full transition text-sm sm:text-base"
          >
            Build a New CV
          </Link>
        </div>

        <p className="mt-5 sm:mt-6 text-xs sm:text-sm text-red-100/80">
          🇹🇿 CV2Kazi — From good CV to getting a job
        </p>
      </div>
    </section>
  );
}