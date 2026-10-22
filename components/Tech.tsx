"use client";

import { useLang } from "./LanguageProvider";
import { Headline, container } from "./ui";

export function Tech() {
  const { t } = useLang();
  const k = t.tech;
  return (
    <section className="border-b border-line py-24 sm:py-32">
      <div className={container}>
        <p className="label text-muted">{k.label}</p>
        <Headline lead={k.title} soft={k.titleSoft} className="mt-8 max-w-3xl" />
        <p className="mt-6 max-w-xl leading-relaxed text-muted">{k.sub}</p>

        <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {k.items.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="group cursor-pointer bg-paper p-7 transition-colors duration-200 hover:bg-ink">
                <span className="label text-[10px] text-muted transition-colors duration-200 group-hover:text-paper/50">{String(i + 1).padStart(2, "0")}</span>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center text-ink transition duration-200 group-hover:scale-110 group-hover:text-paper">
                    <Icon aria-hidden className="h-7 w-7" />
                  </span>
                  <h3 className="display text-xl transition-colors duration-200 group-hover:text-paper" dir="ltr">{item.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted transition-colors duration-200 group-hover:text-paper/70">{item.text}</p>
              </li>
            );
          })}
          {k.items.length % 4 !== 0 && <li aria-hidden className="hidden bg-paper sm:block" />}
        </ul>
      </div>
    </section>
  );
}