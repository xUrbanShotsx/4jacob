import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils.js";
/** Pulsing placeholder for content that is still loading. Size via classes. */
export function Skeleton({ className, ...props }) {
    return (_jsx("div", { "aria-hidden": "true", className: cn("h-4 w-full animate-pulse bg-bg-active", className), ...props }));
}
