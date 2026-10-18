"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { getLangFromPathname, localizeHref } from "@/lib/i18n";

type LocalizedLinkProps = React.ComponentProps<"a"> & {
  href: string;
  children?: ReactNode;
};

export function LocalizedLink({ href, children, ...props }: LocalizedLinkProps) {
  const pathname = usePathname();
  const lang = getLangFromPathname(pathname);
  return (
    <Link href={localizeHref(href, lang)} {...props}>
      {children}
    </Link>
  );
}