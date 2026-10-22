"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { assets } from "@/lib/assets";
import { OutlineButton } from "./ui";
import { FormDialog } from "./Form/Dialog";


export function Logo({ size = "md", priority = false }: { size?: "md" | "sm"; priority?: boolean }) {
  const mark = size === "md" ? "h-9" : "h-7";
  const word = size === "md" ? "text-[1.05rem] tracking-[0.42em]" : "text-sm tracking-[0.42em]";
  return (
    <span className="inline-flex items-center gap-4" dir="ltr">
      <Image src={assets.logo} alt="" width={120} height={120} className={`${mark} w-auto`} priority={priority} />
      <span className={`font-display font-semibold uppercase leading-none text-ink ${word}`}>ENDEVOR</span>
    </span>
  );
}
export function Header() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const prefix = isHome ? "" : "/";

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on scroll
  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [open]);

  const links = [
    { href: `${prefix}#about`, label: t.nav.about },
    { href: `${prefix}#services`, label: t.nav.services },
    { href: `${prefix}#work`, label: t.nav.work },
    { href: `${prefix}#pricing`, label: t.nav.pricing },
  ];

  const langToggle = (
    <div role="group" aria-label={t.a11y.language} className="label flex items-center" dir="ltr">
      <button onClick={() => setLang("en")} aria-pressed={lang === "en"} className={lang === "en" ? "text-ink" : "text-soft hover:text-ink"}>
        EN
      </button>
      <span className="px-2 text-line">/</span>
      <button onClick={() => setLang("ar")} aria-pressed={lang === "ar"} className={lang === "ar" ? "text-ink" : "text-soft hover:text-ink"}>
        AR
      </button>
    </div>
  );

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-page items-center justify-between px-5 sm:px-8">
          <Link href={isHome ? "#top" : "/"} aria-label="ENDEVOR">
            <Logo />
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            <nav className="flex items-center gap-9" aria-label="Primary">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="label text-ink transition hover:opacity-60">
                  {l.label}
                </Link>
              ))}
            </nav>
            {langToggle}
            <OutlineButton onClick={() => setDialogOpen(true)}>{t.cta}</OutlineButton>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center border border-ink md:hidden"
            aria-label={t.a11y.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute inset-x-0 h-px bg-ink transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute inset-x-0 h-px bg-ink transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${open ? "max-h-screen opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
            }`}
          aria-hidden={!open}
        >
          <div className="border-t border-line bg-paper px-5 pb-6 pt-4">
            <nav className="flex flex-col" aria-label="Mobile">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="label border-b border-line py-4">
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex items-center justify-between">
              {langToggle}
              <OutlineButton onClick={() => { setOpen(false); setDialogOpen(true); }}>{t.cta}</OutlineButton>
            </div>
          </div>
        </div>
      </header>
      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
