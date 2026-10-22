"use client";

import { useLang } from "./LanguageProvider";
import { Headline, container } from "./ui";

export function Services() {
  const { t } = useLang();
  const s = t.services;
  return (
    <section id="services" className="border-b border-line py-16 sm:py-20">
      <div className={container}>
        <p className="label text-muted">{s.label}</p>
        <Headline lead={s.title} soft={s.titleSoft} className="mt-8" />

        <ol className="mt-14 border-t border-line">
          {s.items.map((item, i) => (
            <li
              key={item.title}
              className="grid items-center gap-x-6 gap-y-4 border-b border-line py-8 md:grid-cols-[3rem_1.1fr_1.3fr_1.4fr]"
            >
              <span className="label text-[10px] text-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display text-2xl leading-tight sm:text-[1.7rem]">{item.title}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-muted">{item.text}</p>
              <ul className="flex flex-wrap gap-3 md:justify-end">
                {item.tags.map((tag) => (
                  <li key={tag} className="label border border-line px-3 py-2 text-[10px] text-ink">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
