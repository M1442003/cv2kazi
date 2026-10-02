"use client";
import Link from "next/link";
import { useState } from "react";

// Icons
const IconHome = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5z" />
    </svg>
);

const IconAnalyze = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-6" />
    </svg>
);

const IconReview = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
);

const IconBuild = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
    </svg>
);

const IconJobs = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const desktopLinks = [
        { href: "/", label: "Home" },
        { href: "/jobs", label: "Find Jobs" },
        { href: "/#how", label: "How It Works" },
    ];

    const mobileLinks = [
        { href: "/", label: "Home", Icon: IconHome },
        { href: "/analyze", label: "Analyze", Icon: IconAnalyze },
        { href: "/modify", label: "Review", Icon: IconReview },
        { href: "/create", label: "Build", Icon: IconBuild },
        { href: "/jobs", label: "Find Jobs", Icon: IconJobs },
    ];

    return (
        <>
            <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
                    {/* Logo + brand */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-3">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-brand-red flex items-center justify-center text-white font-extrabold text-xs sm:text-sm tracking-tight">
                            C2K
                        </div>
                        <div className="leading-tight">
                            <div className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                                CV2Kazi
                            </div>
                            <div className="hidden sm:block text-[10px] text-slate-500 font-medium tracking-wide">
                                From good CV to getting a job
                            </div>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
                        {desktopLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="hover:text-brand-red transition"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center">
                        <Link
                            href="/analyze"
                            className="bg-brand-lightblue hover:bg-brand-blue text-white text-sm font-semibold px-5 py-2.5 rounded-full transition shadow-sm"
                        >
                            Get Started Free
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setOpen(true)}
                        aria-label="Open menu"
                        className="md:hidden w-10 h-10 flex items-center justify-center text-slate-700"
                    >
                        <span className="text-2xl">☰</span>
                    </button>
                </div>
            </header>

            {/* ────── Mobile side panel ────── */}
            {/* Backdrop (subtle) */}
            <div
                onClick={() => setOpen(false)}
                className={`md:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* Panel */}
            <aside
                className={`md:hidden fixed top-3 right-3 bottom-1/5 w-[280px] max-w-[85vw] bg-white shadow-2xl rounded-2xl z-[70] transition-transform duration-300 ease-out overflow-hidden ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Panel header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-brand-red flex items-center justify-center text-white font-extrabold text-xs">
                            C2K
                        </div>
                        <div className="font-extrabold text-base text-slate-900">
                            CV2Kazi
                        </div>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        aria-label="Close menu"
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600"
                    >
                        <span className="text-2xl leading-none">✕</span>
                    </button>
                </div>

                {/* Panel links + CTA */}
                <div className="flex flex-col h-[calc(100%-64px)]">
                    {/* Nav links */}
                    <nav className="px-3 py-4 flex flex-col gap-1">
                        {mobileLinks.map(({ href, label, Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-brand-red transition"
                            >
                                <span className="text-slate-500">
                                    <Icon />
                                </span>
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Get Started Free — pinned above bottom of panel */}
                    <div className="px-4 mt-auto pb-4">
                        <Link
                            href="/analyze"
                            onClick={() => setOpen(false)}
                            className="block bg-brand-red hover:bg-brand-darkred text-white text-center font-bold py-3.5 rounded-full shadow-lg shadow-brand-red/30 transition"
                        >
                            Get Started Free →
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}