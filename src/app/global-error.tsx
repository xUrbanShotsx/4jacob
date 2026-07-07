"use client";

import { useEffect } from "react";
import { buttonVariants } from "@/components/ui";
import "./globals.css";

/**
 * Top-level error boundary. Catches errors thrown in the root layout itself and
 * replaces the entire document — so it must render its own <html>/<body> and
 * pull in globals.css (the layout, fonts and providers are gone at this point).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to the console (and any attached monitoring) so the digest is traceable.
    console.error(error);
  }, [error]);

  return (
    <html lang="en-AU">
      <body className="flex min-h-screen flex-col bg-bg text-text antialiased">
        <main className="flex flex-1 items-center justify-center px-6 py-24">
          <div className="mx-auto max-w-md text-center">
            <span className="inline-flex items-center justify-center gap-2 font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
              <span className="h-px w-6 bg-border-strong" />
              Error 500
            </span>
            <h1 className="mt-4 text-balance text-4xl tracking-tighter md:text-5xl">
              Something went wrong
            </h1>
            <p className="mt-6 text-balance text-lg text-text-secondary leading-relaxed">
              An unexpected error interrupted the page. Try again, and if it keeps happening, let us
              know.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={reset}
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Try again
              </button>
              <a href="/" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                Back to home
              </a>
            </div>
            {error.digest && (
              <p className="mt-8 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                Reference: {error.digest}
              </p>
            )}
          </div>
        </main>
      </body>
    </html>
  );
}
