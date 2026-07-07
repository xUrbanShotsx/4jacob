import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Props = { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href">;

/**
 * Renders a Next `<Link>` for internal paths and a new-tab `<a>` for absolute
 * URLs (e.g. the external demo app at `DEMO_URL`). Lets data-driven nav/footer
 * arrays mix internal routes and external links without per-item branching.
 */
export function SmartLink({ href, children, ...rest }: Props) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
