import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/utils.js";
/** Square checkbox with an accent check. */
export function Checkbox({ className, ...props }) {
    return (_jsxs("span", { className: "relative inline-flex size-4 shrink-0", children: [_jsx("input", { type: "checkbox", className: cn("peer size-4 cursor-pointer appearance-none border border-border-strong bg-bg-secondary outline-none transition-colors checked:border-accent-border checked:bg-accent-bg focus-visible:ring-2 focus-visible:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50", className), ...props }), _jsx("svg", { className: "pointer-events-none absolute inset-0 hidden size-4 p-[2px] text-text peer-checked:block", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: _jsx("path", { d: "M3 8.5l3.5 3.5 6.5-7" }) })] }));
}
