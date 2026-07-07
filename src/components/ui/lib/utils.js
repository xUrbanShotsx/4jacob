import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
/** Merge class names, de-duplicating conflicting Tailwind utilities. */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
/** "15 March 2026" */
export function formatDate(date) {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}
/** "15 Mar" */
export function formatShortDate(date) {
    return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
