import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils.js";
/** Form field label. */
export function Label({ className, ...props }) {
    return (_jsx("label", { className: cn("font-medium text-[12px] text-text-secondary peer-disabled:opacity-50", className), ...props }));
}
