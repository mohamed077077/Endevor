"use client";

import { useLang } from "./LanguageProvider";
import { contact } from "@/lib/assets";

export function FloatingContact() {
  const { t } = useLang();
  const btn =
    "flex items-center justify-center text-ink transition hover:opacity-70";
  return (
    <div className="fixed bottom-6 end-6 lg:end-10 z-40 flex flex-col gap-3">
      <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={t.a11y.whatsapp} className={btn}>
        {/* viewBox trimmed to the actual icon bounds — removes invisible inner whitespace */}
        <svg viewBox="2 2 20 22" width="44" height="44" fill="currentColor" aria-hidden>
          <path d="M12.04 2a9.9 9.9 0 0 0-8.46 15.04L2 22l5.1-1.34A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.03.8.81-2.95-.2-.31a8.1 8.1 0 1 1 6.96 3.8Zm4.45-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06a6.6 6.6 0 0 1-1.94-1.2 7.3 7.3 0 0 1-1.34-1.67c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
        </svg>
      </a>
    </div>
  );
}
