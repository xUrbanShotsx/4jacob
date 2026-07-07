"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { useState } from "react";
import { cn } from "../lib/utils.js";
export const avatarVariants = cva("relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden border border-border bg-bg-active text-text-secondary", {
    variants: {
        size: {
            sm: "size-6 text-[10px]",
            default: "size-8 text-[12px]",
            lg: "size-10 text-[14px]",
        },
    },
    defaultVariants: { size: "default" },
});
/** User avatar: square image with an initials fallback. Zero radius. */
export function Avatar({ className, size, src, alt = "", fallback, ...props }) {
    const [errored, setErrored] = useState(false);
    const showImage = src && !errored;
    return (_jsx("span", { className: cn(avatarVariants({ size }), className), children: showImage ? (_jsx("img", { src: src, alt: alt, className: "size-full object-cover", onError: () => setErrored(true), ...props })) : (_jsx("span", { "aria-hidden": "true", className: "font-medium uppercase", children: fallback })) }));
}
/** Overlapping cluster of avatars (apply matching `size` to each child). */
export function AvatarGroup({ className, ...props }) {
    return (_jsx("div", { className: cn("flex items-center [&>*]:-ml-2 [&>*]:ring-2 [&>*]:ring-bg", className), ...props }));
}
