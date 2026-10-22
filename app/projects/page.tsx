import type { Metadata } from "next";
import { ProjectsView } from "@/components/ProjectsView";
import { FloatingContact } from "@/components/FloatingContact";

export const metadata: Metadata = {
  title: "Projects | ENDEVOR",
  description:
    "Explore all digital products, platforms, and web applications designed and built end-to-end by ENDEVOR.",
};

export default function ProjectsPage() {
  return (
    <>
      <main  className="">
        <ProjectsView />
      </main>
      <FloatingContact />
    </>
  );
}
