import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils.js";
export const badgeVariants = cva("inline-flex items-center px-1.5 py-0.5 font-medium text-[9px] uppercase tracking-[0.05em]", {
    variants: {
        variant: {
            primary: "bg-accent-bg text-text dark:text-accent-text",
            blue: "bg-(--badge-blue-bg) text-(--badge-blue-text)",
            yellow: "bg-(--badge-yellow-bg) text-(--badge-yellow-text)",
            green: "bg-(--badge-green-bg) text-(--badge-green-text)",
            coral: "bg-destructive-bg text-destructive-text",
            neutral: "border border-border bg-bg-secondary text-text-muted",
            status: "border border-(--status-border) bg-(--status-bg) text-(--status-text)",
        },
    },
    defaultVariants: { variant: "neutral" },
});
/** Compact status/label pill. 9px uppercase, sharp corners. */
export function Badge({ className, variant, ...props }) {
    return _jsx("span", { className: cn(badgeVariants({ variant }), className), ...props });
}
