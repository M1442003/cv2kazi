import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <Link
          href="/"
          className="text-sm text-slate-500 hover:text-brand-red transition mb-4 inline-block"
        >
          ← Back to home
        </Link>

        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-900">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          Last updated: October 2025
        </p>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              1. Acceptance
            </h2>
            <p>
              By using CV2Kazi, you agree to these terms. If you don't agree,
              please don't use the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              2. Free service
            </h2>
            <p>
              CV2Kazi is currently free. We reserve the right to introduce
              paid features in the future, but the free tier will remain
              available.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              3. AI limitations
            </h2>
            <p>
              Our AI analysis is a suggestion, not professional career
              advice. AI can make mistakes. Always review our feedback before
              acting on it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              4. Acceptable use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Upload CVs that aren't yours without permission</li>
              <li>Attempt to overload or abuse the service</li>
              <li>Use the service for illegal purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              5. No warranty
            </h2>
            <p>
              The service is provided "as is". We don't guarantee it will
              always be available or error-free. We're not responsible for
              outcomes of job applications.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              6. Contact
            </h2>
            <p>
              Questions? Email{" "}
              <a
                href="mailto:hello@cv2kazi.tz"
                className="text-brand-red underline"
              >
                hello@cv2kazi.tz
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
