"use client";

import { useLang } from "./LanguageProvider";
import { Headline, container } from "./ui";
import { ProjectCard } from "./ProjectCard";
import { BackLink } from "./BackLink";

export function ProjectsView() {
  const { t } = useLang();
  const w = t.work;
  const p = t.projectsPage;

  return (
    <div className="py-10 sm:py-16">
      <div className={container}>
        {/* Back navigation at top */}
        <div className="pointer-events-none sticky top-4 z-40 mb-10 sm:mb-14">
          <BackLink href="/#work" className="pointer-events-auto">
            {p.back}
          </BackLink>
        </div>
        {/* All projects with identical UI */}
        <div className="space-y-20 ">
          {w.items.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              servicesLabel={w.servicesLabel}
              techLabel={w.techLabel}
              visitLabel={w.visit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
