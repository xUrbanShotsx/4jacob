/**
 * Route-level loading fallback — shown while a server segment streams in.
 * Renders inside the root layout, so the nav and footer stay put; this just
 * fills the content area with a centred, brand-tinted spinner.
 */
export default function Loading() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-6">
      <div
        aria-hidden
        className="size-8 animate-spin rounded-full border-2 border-border border-t-text"
      />
      <span className="font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
        Loading
      </span>
    </main>
  );
}
