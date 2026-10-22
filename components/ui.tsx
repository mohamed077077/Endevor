import Link from "next/link";
import React from "react";

export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={`${diagonal ? "" : "flip-rtl"} ${className}`}
    >
      {diagonal ? <path d="M4 12 12 4M5.5 4H12v6.5" /> : <path d="M2 8h11M9 4l4 4-4 4" />}
    </svg>
  );
}

export function BackArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={`flip-rtl ${className}`}
    >
      <path d="M14 8H3M7 4L3 8l4 4" />
    </svg>
  );
}

type ButtonProps =
  | { href: string; onClick?: never; children: React.ReactNode }
  | { href?: never; onClick: () => void; children: React.ReactNode };

export function SolidButton({ href, onClick, children }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className="label inline-flex h-12 items-center gap-3 bg-ink px-7 text-paper transition hover:bg-ink/85">
        {children}
        <Arrow />
      </Link>
    );
  }
  return (
    <button onClick={onClick} className="label inline-flex h-12 items-center gap-3 bg-ink px-7 text-paper transition hover:bg-ink/85">
      {children}
      <Arrow />
    </button>
  );
}

export function OutlineButton({ href, onClick, children }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className="label inline-flex h-11 items-center gap-3 border border-ink px-5 text-ink transition hover:bg-ink hover:text-paper">
        {children}
        <Arrow />
      </Link>
    );
  }
  return (
    <button onClick={onClick} className="label inline-flex h-11 items-center gap-3 border border-ink px-5 text-ink transition hover:bg-ink hover:text-paper">
      {children}
      <Arrow />
    </button>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="label inline-flex h-12 items-center gap-2 text-ink transition hover:opacity-60">
      {children}
      <Arrow diagonal />
    </Link>
  );
}

/** Two-tone headline: dark lead, gray follow-up */
export function Headline({ lead, soft, className = "" }: { lead: string; soft?: string; className?: string }) {
  return (
    <h2 className={`display text-4xl leading-[1.05] sm:text-6xl ${className}`}>
      {lead}
      {soft && (
        <>
          {" "}
          <span className="text-soft">{soft}</span>
        </>
      )}
    </h2>
  );
}

export const container = "mx-auto w-full max-w-page px-5 sm:px-8";
