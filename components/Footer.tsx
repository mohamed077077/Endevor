"use client";

import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { assets, contact } from "@/lib/assets";
import { OutlineButton, container } from "./ui";
import { Logo } from "./Header";

export function Footer() {
  const { t } = useLang();
  const f = t.footer;

  const social = [
    { href: contact.linkedin, label: "LinkedIn" },
    { href: contact.instagram, label: "Instagram" },
    { href: contact.github, label: "GitHub" },
  ];

  return (
    <footer className="border-t border-line">
      <div className={`${container} flex flex-col justify-between gap-4 py-6 sm:flex-row`}>
          <p className="label text-[10px] text-muted">{f.rights} — {f.motto}</p>
          <ul className="flex gap-6">
            {social.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="label text-[10px] text-muted transition hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
    </footer>
  );
}
