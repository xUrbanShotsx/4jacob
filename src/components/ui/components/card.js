import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils.js";
export const cardVariants = cva("border border-border bg-bg-secondary p-4", {
    variants: {
        variant: {
            default: "transition-colors hover:border-border-hover",
            elevated: "shadow-[0_1px_2px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.25),inset_0_1px_0_0_rgba(255,255,255,0.04)]",
        },
    },
    defaultVariants: { variant: "default" },
});
/** Surface container. `elevated` for popovers/floating panels. Sharp corners. */
export function Card({ className, variant, ...props }) {
    return _jsx("div", { className: cn(cardVariants({ variant }), className), ...props });
}
export function CardHeader({ className, ...props }) {
    return _jsx("div", { className: cn("mb-3 flex flex-col gap-1", className), ...props });
}
export function CardTitle({ className, ...props }) {
    return _jsx("h3", { className: cn("font-medium text-[13px] text-text", className), ...props });
}
export function CardDescription({ className, ...props }) {
    return _jsx("p", { className: cn("text-[12px] text-text-tertiary", className), ...props });
}
export function CardContent({ className, ...props }) {
    return _jsx("div", { className: cn("text-[12px] text-text-secondary", className), ...props });
}
export function CardFooter({ className, ...props }) {
    return _jsx("div", { className: cn("mt-3 flex items-center gap-2", className), ...props });
}
