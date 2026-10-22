"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackArrow } from "./ui";

export function BackLink({
  href = "/",
  children,
  className = "",
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If the user navigated here from within the site, go back to restore previous scroll position
    if (typeof window !== "undefined" && window.history.length > 1) {
      e.preventDefault();
      router.back();
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`label group inline-flex items-center gap-2.5  text-ink transition-colors duration-200 hover:text-ink/60 ${className}`}
    >
      <BackArrow className="transition-transform duration-200 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
      <span>{children}</span>
    </Link>
  );
}