"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { Headline, SolidButton, container } from "./ui";
import { FormDialog } from "./Form/Dialog";

export function Closing() {
  const { t } = useLang();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <section id="contact" className="py-16 sm:py-20">
        <div className={container}>
          <Headline lead={t.closing.title} soft={t.closing.titleSoft} className="max-w-3xl sm:text-7xl" />
          <p className="mt-6 max-w-md text-lg text-muted">{t.closing.text}</p>
          <div className="mt-10">
            <SolidButton onClick={() => setDialogOpen(true)}>{t.hero.start}</SolidButton>
          </div>
        </div>
      </section>

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
