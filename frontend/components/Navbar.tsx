"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const links = [
        { href: "/", label: "Home" },
        { href: "/jobs", label: "Find Jobs" },
        { href: "/#pillars", label: "What You Can Do" },
        { href: "/#how", label: "How It Works" },
    ];

    return (
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
                    {links.map((l) => (
                        <Link key={l.href} href={l.href} className="hover:text-brand-red transition">
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

                {/* Mobile: Start + hamburger */}
                <div className="flex md:hidden items-center gap-2">
                    <Link
                        href="/analyze"
                        className="bg-brand-lightblue text-white text-xs font-semibold px-4 py-2 rounded-full"
                    >
                        Start
                    </Link>
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                        className="w-10 h-10 flex items-center justify-center text-slate-700"
                    >
                        <span className="text-2xl">{open ? "✕" : "☰"}</span>
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {open && (
                <div className="md:hidden border-t border-slate-200 bg-white">
                    <nav className="flex flex-col px-4 py-3">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="py-3 text-sm font-medium text-slate-700 hover:text-brand-red border-b border-slate-100 last:border-0"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}