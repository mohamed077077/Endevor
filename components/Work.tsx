"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { Arrow, Headline, container } from "./ui";
import { ProjectCard } from "./ProjectCard";

export function Work({ limit = 2 }: { limit?: number } = {}) {
  const { t } = useLang();
  const w = t.work;
  const items = typeof limit === "number" ? w.items.slice(0, limit) : w.items;

  return (
    <section id="work" className="border-b border-line py-16 sm:py-20">
      <div className={container}>
        <p className="label text-muted">{w.label}</p>
        <Headline lead={w.title} soft={w.titleSoft} className="mt-8" />

        <div className="mt-16 space-y-20">
          {items.map((p, i) => (
            <ProjectCard
              key={p.name}
              project={p}
              index={i}
              servicesLabel={w.servicesLabel}
              techLabel={w.techLabel}
              visitLabel={w.visit}
            />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/projects"
            className="label inline-flex h-12 items-center gap-3 border border-ink px-8 text-ink transition hover:bg-ink hover:text-paper"
          >
            {w.showMore}
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
