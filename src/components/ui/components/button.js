import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils.js";
export const buttonVariants = cva("inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap border font-medium transition-all duration-200 hover:-translate-y-px active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/10 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            primary: "border-button-primary-text bg-button-primary-text text-text shadow-[0_0_0_0_var(--button-primary-text)] hover:shadow-[0_10px_24px_-10px_var(--button-primary-text)] hover:brightness-95 dark:border-button-primary-border dark:bg-button-primary-bg dark:text-text dark:hover:border-button-primary-border-hover dark:hover:bg-button-primary-bg-hover",
            secondary: "border-border-strong bg-bg text-text hover:border-button-primary-text hover:bg-bg-hover hover:text-text dark:bg-bg-secondary dark:hover:border-button-primary-border-hover",
            ghost: "border-transparent bg-transparent text-text-secondary hover:bg-bg-hover hover:text-text",
            destructive: "border-destructive-border bg-destructive-bg text-destructive-text shadow-[0_0_0_0_var(--destructive-text)] hover:shadow-[0_10px_24px_-10px_var(--destructive-text)] hover:bg-destructive-bg-hover",
        },
        size: {
            default: "h-[30px] px-3 text-[11.4px]",
            lg: "h-[34px] px-4 text-[13px]",
        },
    },
    defaultVariants: { variant: "primary", size: "default" },
});
/** Action control. Sharp-cornered; primary = accent-green CTA. */
export function Button({ className, variant, size, type = "button", ...props }) {
    return (_jsx("button", { type: type, className: cn(buttonVariants({ variant, size }), className), ...props }));
}
