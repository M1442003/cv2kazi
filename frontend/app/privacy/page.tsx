import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <Link
          href="/"
          className="text-sm text-slate-500 hover:text-brand-red transition mb-4 inline-block"
        >
          🔙 Back to home
        </Link>

        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-900">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          Last updated: October 2025
        </p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              1. What we collect
            </h2>
            <p>
              When you upload a CV, we temporarily process the file content
              to run our analysis. We do <b>not</b> store your CV on our
              servers. Once analysis completes, the file is discarded.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              2. How we process your CV
            </h2>
            <p>
              Your CV text is sent to <b>Google Gemini</b> (Google's AI
              service) for analysis. Google's privacy policy and terms apply
              to that processing. We do not send your name, email, or phone
              number anywhere else.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              3. Data retention
            </h2>
            <p>
              We do <b>not</b> retain your CV or the analysis results. Once
              you close the results page, they are gone. No account, no
              storage, no history.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              4. Analytics
            </h2>
            <p>
              We use anonymized analytics (Vercel Analytics) to count page
              visits. No personal data is collected. We do not track
              individual users.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              5. Your rights (PDPC - Tanzania)
            </h2>
            <p>
              Under the Tanzanian Personal Data Protection Act (PDPA) 2022,
              you have the right to know what data is collected, to correct
              it, and to request deletion. Since we don't store CVs, there is
              nothing to delete. For any questions, contact us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              6. Contact
            </h2>
            <p>
              Questions about privacy? Email{" "}
              <a
                href="mailto:husseinmatolak@gmail.com"
                className="text-brand-red underline"
              >
                husseinmatolak@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
