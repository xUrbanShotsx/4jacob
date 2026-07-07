import type { CSSProperties } from "react";
import { cn } from "@/components/ui";

/**
 * A bottom-anchored "fade to blur" overlay — stacks several `backdrop-filter`
 * layers behind progressive masks so an image dissolves smoothly into blur
 * (no hard cut-off). Pair over photos/cards to seat captions or controls.
 * Pure CSS; safe in a server component.
 */
export function ProgressiveBlur({
  className,
  height = 40,
  scrimOpacity = 0,
}: {
  className?: string;
  /** Share of the parent's height the effect covers, in percent. */
  height?: number;
  /** Optional dark scrim (0–100) layered under the blur for text contrast. */
  scrimOpacity?: number;
}) {
  const layers: { blur: number; mask: string }[] = [
    { blur: 1, mask: "linear-gradient(to bottom, transparent, black 25%)" },
    { blur: 2, mask: "linear-gradient(to bottom, transparent 20%, black 45%)" },
    { blur: 4, mask: "linear-gradient(to bottom, transparent 40%, black 65%)" },
    { blur: 8, mask: "linear-gradient(to bottom, transparent 60%, black 85%)" },
    { blur: 16, mask: "linear-gradient(to bottom, transparent 80%, black)" },
    { blur: 32, mask: "linear-gradient(to bottom, transparent 90%, black)" },
  ];

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-x-0 bottom-0", className)}
      style={{ height: `${height}%` }}
    >
      {scrimOpacity > 0 && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent"
          style={{ "--tw-gradient-to": `rgb(0 0 0 / ${scrimOpacity}%)` } as CSSProperties}
        />
      )}
      {layers.map((layer) => (
        <div
          key={layer.blur}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: layer.mask,
            WebkitMaskImage: layer.mask,
          }}
        />
      ))}
    </div>
  );
}
