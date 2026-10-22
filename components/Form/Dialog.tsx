"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../LanguageProvider";
import { ContactForm } from "./Form";

/* ─── Props ───────────────────────────────────────────────── */
export interface FormDialogProps {
  open: boolean;
  onClose: () => void;
}

/* ─── Icons ───────────────────────────────────────────────── */
function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M3 3l10 10M13 3L3 13" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M5 13l5 5L19 7" />
    </svg>
  );
}

/* ─── Dialog ──────────────────────────────────────────────── */
export function FormDialog({ open, onClose }: FormDialogProps) {
  const { t, lang } = useLang();
  const f = t.form;
  const isRtl = lang === "ar";

  const [mounted, setMounted] = useState(false);
  const [success, setSuccess] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Portal mount guard
  useEffect(() => { setMounted(true); }, []);

  // Body scroll-lock + auto-focus first input
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Escape key closes
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose();
    },
    [onClose],
  );

  // Close + reset after exit animation
  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => setSuccess(false), 300);
  }, [onClose]);

  if (!mounted) return null;

  const dialog = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={f.title}
      dir={isRtl ? "rtl" : "ltr"}
      data-open={open}
      className={[
        "fixed inset-0 z-[200] flex items-end sm:items-center justify-center",
        "transition-all duration-300",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        className={[
          "absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
        aria-hidden
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={[
          "relative w-full sm:max-w-lg bg-paper border border-line",
          "max-h-[95dvh] overflow-y-auto",
          "transition-all duration-300 ease-out",
          open ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.98]",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-line px-6 py-5">
          <div>
            <p className="label text-soft">{isRtl ? "ENDEVOR / تواصل" : "ENDEVOR / Contact"}</p>
            <h2 className="display mt-0.5 text-2xl font-semibold text-ink">{f.title}</h2>
          </div>
          <button
            onClick={handleClose}
            aria-label={t.a11y.close}
            className="flex h-9 w-9 items-center justify-center text-soft transition hover:text-ink"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body — success state or form */}
        {success ? (
          <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center border border-line text-ink">
              <CheckIcon />
            </div>
            <h3 className="display text-xl font-semibold text-ink">{f.successTitle}</h3>
            <p className="text-soft">{f.successText}</p>
            <button
              onClick={handleClose}
              className="label mt-4 inline-flex h-11 items-center border border-ink px-6 text-ink transition hover:bg-ink hover:text-paper"
            >
              {isRtl ? "إغلاق" : "Close"}
            </button>
          </div>
        ) : (
          <ContactForm
            onSuccess={() => setSuccess(true)}
            firstFieldRef={firstFieldRef}
          />
        )}
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}
