import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils.js";
/** 1px rule in `--border`. */
export function Separator({ className, orientation = "horizontal", ...props }) {
    return (_jsx("hr", { "aria-orientation": orientation, className: cn("border-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className), ...props }));
}
