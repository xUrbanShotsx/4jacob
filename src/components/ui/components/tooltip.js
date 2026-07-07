import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/utils.js";
/** Lightweight CSS hover tooltip: a dashed-underline trigger + popover. */
export function Tooltip({ label, className, children, ...props }) {
    return (_jsxs("span", { className: cn("group relative inline-flex cursor-default items-center gap-1 border-border-strong border-b border-dashed text-[12px] text-text-secondary", className), ...props, children: [children, _jsx("span", { className: "pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 hidden -translate-x-1/2 whitespace-nowrap border border-border bg-bg-secondary px-2.5 py-1.5 font-medium text-[11px] text-text shadow-[0_4px_12px_rgba(0,0,0,0.15)] group-hover:block", children: label })] }));
}
