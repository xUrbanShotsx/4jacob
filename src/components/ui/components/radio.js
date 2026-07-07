import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/utils.js";
/** Square radio with an accent indicator. Group via a shared `name`. */
export function Radio({ className, ...props }) {
    return (_jsxs("span", { className: "relative inline-flex size-4 shrink-0", children: [_jsx("input", { type: "radio", className: cn("peer size-4 cursor-pointer appearance-none border border-border-strong bg-bg-secondary outline-none transition-colors checked:border-accent-border checked:bg-accent-bg focus-visible:ring-2 focus-visible:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50", className), ...props }), _jsx("span", { className: "pointer-events-none absolute inset-0 m-auto hidden size-1.5 bg-text peer-checked:block" })] }));
}
