import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils.js";
/** Keyboard hint. 10px mono, 18px tall, sharp corners. */
export function Kbd({ className, ...props }) {
    return (_jsx("kbd", { className: cn("inline-flex h-[18px] items-center border border-border bg-bg-secondary px-1.5 font-medium font-mono text-[10px] text-text-muted", className), ...props }));
}
