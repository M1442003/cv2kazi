import Link from "next/link";

export default function Footer() {
  return (
    <footer id="faq" className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 grid md:grid-cols-4 gap-8 sm:gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white font-extrabold text-xs tracking-tight">
              C2K
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-lg text-white">CV2Kazi</div>
              <div className="text-[10px] text-slate-400 tracking-wide">
                From good CV to getting a job
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-sm">
            Free AI-powered CV review for the Tanzanian job market. Helping
            students, career changers, and professionals land better roles.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
            Product
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/analyze" className="hover:text-white transition">
                Analyze CV
              </Link>
            </li>
            <li>
              <Link href="/create" className="hover:text-white transition">
                Build CV
              </Link>
            </li>
            <li>
              <Link href="/modify" className="hover:text-white transition">
                Improve Bullets
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
            Contact
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:hello@cv2kazi.tz"
                className="hover:text-white transition"
              >
                husseinmatolak@cv2kazi.tz
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} CV2Kazi. Made in Tanzania 🇹🇿</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy</a>
            <a href="#" className="hover:text-slate-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}