import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils.js";
/** Determinate progress bar. The fill uses `--text` for high contrast. */
export function Progress({ className, value, max = 100, ...props }) {
    const clamped = value === undefined ? undefined : Math.min(Math.max(value, 0), max);
    const pct = clamped === undefined ? 0 : (clamped / max) * 100;
    return (_jsx("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": max, "aria-valuenow": clamped, className: cn("relative h-1.5 w-full overflow-hidden bg-bg-active", className), ...props, children: _jsx("div", { className: "h-full bg-text transition-[width] duration-300 ease-out", style: { width: `${pct}%` } }) }));
}
