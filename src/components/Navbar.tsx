"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";

const SECTION_IDS = ["profil", "produk"];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string>(""); // bagian yang sedang terlihat di beranda

  // Scroll-spy: tandai menu sesuai bagian yang sedang dilihat (hanya di beranda).
  useEffect(() => {
    if (pathname !== "/") return;
    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && section === "";
    if (href.startsWith("/#")) return pathname === "/" && section === href.slice(2);
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-gradient-to-br from-brand-600 to-brand-500">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-800">{SITE.name}</span>
        </Link>

        <ul className="hidden items-center gap-6 lg:gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm font-semibold transition-colors hover:text-brand-600 ${isActive(l.href) ? "text-brand-600" : "text-slate-500"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/pembayaran"
              className={`rounded-[10px] px-5 py-2.5 text-sm font-semibold transition ${
                pathname.startsWith("/pembayaran") ? "bg-brand-800 text-white" : "bg-brand-600 text-white hover:bg-brand-700"
              }`}
            >
              Pembayaran
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="border-t border-slate-100 bg-white px-4 pb-3 md:hidden">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-brand-50 ${isActive(l.href) ? "text-brand-600" : "text-slate-700"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/pembayaran" onClick={() => setOpen(false)} className="mt-1 block rounded-lg bg-brand-600 px-3 py-2.5 text-center text-sm font-semibold text-white">
              Pembayaran
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
