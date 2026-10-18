import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export function ArrowLink({ href, children, className = "", dark = false }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.06em] uppercase ${
        dark ? "text-ivory" : "text-ink"
      } ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight
        className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        size={17}
        strokeWidth={2}
      />
    </Link>
  );
}