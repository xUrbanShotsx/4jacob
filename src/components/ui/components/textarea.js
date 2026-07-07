import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils.js";
/** Multi-line text input, styled to match `Input`. */
export function Textarea({ className, ...props }) {
    return (_jsx("textarea", { className: cn("min-h-20 w-full border border-border bg-bg-secondary px-3 py-2 font-medium text-[12px] text-text outline-none transition-all placeholder:text-text-placeholder hover:border-border-hover focus:border-border-hover focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50", className), ...props }));
}
