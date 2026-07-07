import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils.js";
export const inputVariants = cva("w-full border border-border bg-bg-secondary px-3 font-medium text-text outline-none transition-all placeholder:text-text-placeholder hover:border-border-hover focus:border-border-hover focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50", {
    variants: {
        inputSize: {
            default: "h-9 text-[12px]",
            lg: "h-10 text-[13px]",
        },
    },
    defaultVariants: { inputSize: "default" },
});
/** Text input. 36px (app) / 40px (auth via `inputSize="lg"`). */
export function Input({ className, inputSize, type = "text", ...props }) {
    return _jsx("input", { type: type, className: cn(inputVariants({ inputSize }), className), ...props });
}
