"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { Headline, container } from "./ui";

export function Pricing() {
  const { t } = useLang();
  const p = t.pricing;

  return (
    <section id="pricing" className="border-b border-line py-16 sm:py-20">
      <div className={container}>
        <p className="label text-muted">{p.label}</p>
        <Headline lead={p.title} soft={p.titleSoft} className="mt-8 max-w-3xl" />

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {p.plans.map((plan) => {
            const f = plan.featured;
            return (
              <li
                key={plan.name}
                className={`flex flex-col border p-8 sm:p-10 ${f ? "border-ink bg-ink text-paper" : "border-line"}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="label">{plan.name}</h3>
                  {f && <span className="label border border-paper/40 px-2 py-1 text-[10px]">{p.popular}</span>}
                </div>

                <p className="mt-8 flex items-baseline gap-2">
                  <span className="display text-6xl" dir="ltr">${plan.price}</span>
                  <span className="label text-[10px] opacity-60">{p.period}</span>
                </p>
                <p className={`mt-4 text-sm leading-relaxed ${f ? "text-paper/70" : "text-muted"}`}>{plan.text}</p>

                <ul className={`mt-8 space-y-3 border-t pt-8 text-sm ${f ? "border-paper/20" : "border-line"}`}>
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-current" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contact"
                  className={`label mt-auto inline-flex h-12 items-center justify-center border px-6 transition ${
                    f ? "border-paper bg-paper text-ink hover:bg-paper/85" : "border-ink hover:bg-ink hover:text-paper"
                  }`}
                  style={{ marginTop: "2.5rem" }}
                >
                  {p.cta}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}