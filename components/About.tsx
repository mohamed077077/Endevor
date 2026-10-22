"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { Arrow, Headline, container } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

/** Shared slider logic: autoplay after idle time, pause on hover/focus/touch. */
function useSlider(total: number, intervalMs: number) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Any change of `active` (arrows, bars) restarts the timer.
  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % total), intervalMs);
    return () => clearTimeout(id);
  }, [active, paused, total, intervalMs]);

  return {
    active,
    paused,
    setActive,
    next: () => setActive((i) => (i + 1) % total),
    prev: () => setActive((i) => (i - 1 + total) % total),
    handlers: {
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onFocus: () => setPaused(true),
      onBlur: () => setPaused(false),
      onTouchStart: () => setPaused(true),
      onTouchEnd: () => setPaused(false),
    },
  };
}

const arrowBtn =
  "flex h-10 w-10 items-center justify-center border border-ink text-ink transition hover:bg-ink hover:text-paper";

/** Progress bars (jump to item) + previous/next arrows, placed inside a square */
function Controls({ labels, slider }: { labels: string[]; slider: ReturnType<typeof useSlider> }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex">
        {labels.map((label, i) => (
          <button
            key={i}
            type="button"
            onClick={() => slider.setActive(i)}
            aria-label={label}
            aria-current={i === slider.active}
            className="flex h-10 items-center pe-2"
          >
            <span className={`block h-0.5 w-5 transition sm:w-6 ${i === slider.active ? "bg-ink" : "bg-line"}`} />
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={slider.prev} aria-label="Previous" className={arrowBtn}>
          <span className="rotate-180">
            <Arrow />
          </span>
        </button>
        <button type="button" onClick={slider.next} aria-label="Next" className={arrowBtn}>
          <Arrow />
        </button>
      </div>
    </div>
  );
}

// Thin line border like the rest of the page; always a square
const square =
  "flex aspect-square w-full flex-col justify-between gap-6 border border-line p-6 sm:max-w-[40rem] sm:gap-8 sm:p-10 lg:max-w-none";

export function About() {
  const { t } = useLang();
  const a = t.about;

  const benefits = useSlider(a.points.length, 4000);
  const reviews = useSlider(a.reviews.items.length, 6000);

  const point = a.points[benefits.active];
  const review = a.reviews.items[reviews.active];

  return (
    <section id="about" className="border-b border-line py-24 sm:py-32">
      <div className={container}>
        <p className="label text-muted">{a.label}</p>

        {/* Phones: headline and intro sit outside, like the other sections */}
        <div className="sm:hidden">
          <Headline lead={a.title} soft={a.titleSoft} className="mt-8" />
          <p className="mt-6 leading-relaxed text-muted">{a.lead}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-8 lg:grid-cols-2">
          {/* Square 1: benefits (headline and intro join it from tablet up) */}
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label={a.label}
            className={square}
            {...benefits.handlers}
          >
            <div className="hidden sm:block">
              <h2 className="display text-3xl leading-[1.05] sm:text-5xl">
                {a.title} <span className="text-soft">{a.titleSoft}</span>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted">{a.lead}</p>
            </div>

            <div className="sm:border-t sm:border-line sm:pt-6">
              <p className="label text-[10px] text-muted" dir="ltr">
                {pad(benefits.active + 1)} / {pad(a.points.length)}
              </p>
              <div
                key={benefits.active}
                aria-live={benefits.paused ? "polite" : "off"}
                className="mt-4 animate-[rise_0.5s_ease-out] motion-reduce:animate-none sm:min-h-[5.5rem]"
              >
                <h3 className="display text-3xl sm:text-2xl">{point.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted sm:mt-2">{point.text}</p>
              </div>
            </div>

            <Controls labels={a.points.map((p) => p.title)} slider={benefits} />
          </div>

          {/* Square 2: client reviews */}
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label={a.reviews.label}
            className={square}
            {...reviews.handlers}
          >
            <div className="flex items-center justify-between">
              <p className="label text-muted">{a.reviews.label}</p>
              <p className="label text-[10px] text-muted" dir="ltr">
                {pad(reviews.active + 1)} / {pad(a.reviews.items.length)}
              </p>
            </div>

            <figure
              key={reviews.active}
              aria-live={reviews.paused ? "polite" : "off"}
              className="animate-[rise_0.5s_ease-out] motion-reduce:animate-none"
            >
              <blockquote className="font-display text-lg leading-snug tracking-[-0.02em] sm:text-2xl">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4 sm:mt-6">
                <p className="text-sm font-medium">{review.name}</p>
                <p className="text-sm text-muted">{review.role}</p>
              </figcaption>
            </figure>

            <Controls labels={a.reviews.items.map((_, i) => `Review ${i + 1}`)} slider={reviews} />
          </div>
        </div>
      </div>
    </section>
  );
}