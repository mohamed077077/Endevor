"use client";

import Image from "next/image";
import { Arrow } from "./ui";

export type ProjectItem = {
  name: string;
  category: string;
  text: string;
  services: string;
  tech: string;
  href: string;
  image?: string;
  imageAlt?: string;
};

export function ProjectCard({
  project,
  index,
  servicesLabel,
  techLabel,
  visitLabel,
}: {
  project: ProjectItem;
  index: number;
  servicesLabel: string;
  techLabel: string;
  visitLabel: string;
}) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-2">
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={project.imageAlt || project.name}
        className={`relative block aspect-[4/3] overflow-hidden border border-line bg-ink/[0.03] transition-colors duration-300 hover:border-ink/40 ${
          index % 2 ? "lg:order-2" : ""
        }`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt || project.name}
            fill
            sizes="(min-width:1024px) 40vw, 100vw"
            className="object-cover"
          />
        ) : (
          // Placeholder until a screenshot is added to /public/work and set in lib/content.ts
          <div className="flex h-full items-center justify-center">
            <span className="display text-3xl text-soft" dir="ltr">
              {project.name}
            </span>
          </div>
        )}
      </a>

      <div>
        <p className="label text-muted">{project.category}</p>
        <h3 className="display mt-4 text-4xl">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:opacity-60"
          >
            {project.name}
          </a>
        </h3>
        <p className="mt-5 max-w-lg leading-relaxed text-muted">{project.text}</p>
        <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <dt className="label text-[10px] text-muted">{servicesLabel}</dt>
            <dd className="mt-2 text-sm" dir="auto">
              {project.services}
            </dd>
          </div>
          <div>
            <dt className="label text-[10px] text-muted">{techLabel}</dt>
            <dd className="mt-2 text-sm" dir="ltr">
              {project.tech}
            </dd>
          </div>
        </dl>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="label mt-8 inline-flex items-center gap-3 transition hover:opacity-60"
        >
          {visitLabel}
          <Arrow diagonal />
        </a>
      </div>
    </article>
  );
}
