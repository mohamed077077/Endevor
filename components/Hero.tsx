"use client";

import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { assets } from "@/lib/assets";
import { SolidButton, TextLink, container } from "./ui";

function Construction() {
  const cross = (x: number, y: number, delay: number) => (
    <path
      key={`${x}-${y}`}
      d={`M${x - 4} ${y}H${x + 4}M${x} ${y - 4}V${y + 4}`}
      className="hero-fade"
      style={{ animationDelay: `${delay}s` }}
    />
  );
  return (
    <svg aria-hidden viewBox="0 0 560 560" className="absolute inset-0 h-full w-full text-ink/40" fill="none" stroke="currentColor" strokeWidth="0.8">
      {/* Outer circle draws itself */}
      <circle cx="290" cy="270" r="215" pathLength={1} className="hero-draw" style={{ animationDelay: "0.1s" }} />

      {/* Inner ring of dots, slowly turning */}
      <g className="hero-fade" style={{ animationDelay: "0.9s" }}>
        <circle cx="290" cy="270" r="190" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0.1 8" className="hero-spin" />
      </g>

      {/* Guide lines draw themselves */}
      <path
        d="M60 330 190 190M110 120V470M470 160V430M300 60V150M455 290V500"
        pathLength={1}
        className="hero-draw"
        style={{ animationDelay: "0.5s", animationDuration: "2.2s" }}
      />

      {/* Registration crosses fade in last */}
      {cross(110, 400, 1.6)}
      {cross(445, 190, 1.8)}
      {cross(500, 270, 2)}
    </svg>
  );
}

export function Hero() {
  const { t } = useLang();
  const h = t.hero;

  return (
    <section className="pt-20">
      <div className={`${container} grid items-center gap-8 py-10 lg:grid-cols-[1fr_1fr] lg:py-14`}>
        <div className="hero-rise">
          <p className="label text-ink">{h.eyebrow}</p>
          <h1 className="display mt-8 max-w-xl text-5xl leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
            {h.title} <span className="text-soft">{h.titleSoft}</span>
          </h1>
          <p className="mt-8 max-w-sm leading-relaxed text-muted">{h.sub}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2">
            <SolidButton href="#work">{h.explore}</SolidButton>
            <TextLink href="#contact">{h.start}</TextLink>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
          <Construction />

          {/* Logo eases in, then floats gently */}
          <div className="hero-pop absolute inset-[24%]">
            <div className="hero-float flex h-full w-full items-center justify-center">
              <Image src={assets.logo} alt="" width={600} height={600} className="max-h-full w-full object-contain" priority />
            </div>
          </div>

          {/* Side words appear one after another */}
          <div className="label absolute end-0 top-6 hidden flex-col items-center gap-1.5 text-[10px] text-muted sm:flex">
            {h.side.map((s, i) => (
              <span key={s} className="hero-fade" style={{ animationDelay: `${0.8 + i * 0.15}s` }}>
                {s}
              </span>
            ))}
            <span className="hero-fade mt-2 h-px w-6 bg-ink/40" style={{ animationDelay: "1.3s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}