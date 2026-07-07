import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils.js";
/** Bordered table. Use with native `thead`/`tbody`/`tr` + `Th`/`Td`. */
export function Table({ className, ...props }) {
    return (_jsx("table", { className: cn("w-full border-collapse border border-border", className), ...props }));
}
export function Th({ className, ...props }) {
    return (_jsx("th", { className: cn("border-border border-b bg-bg px-4 py-2.5 text-left font-medium text-[10px] text-text-tertiary uppercase tracking-[0.1em]", className), ...props }));
}
export function Td({ className, ...props }) {
    return (_jsx("td", { className: cn("border-border border-b bg-bg-secondary px-4 py-2.5 text-[12.5px] text-text [tr:last-child_&]:border-b-0", className), ...props }));
}
