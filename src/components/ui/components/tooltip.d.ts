import type { HTMLAttributes, ReactNode } from "react";
export interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
    label: ReactNode;
}
/** Lightweight CSS hover tooltip: a dashed-underline trigger + popover. */
export declare function Tooltip({ label, className, children, ...props }: TooltipProps): import("react").JSX.Element;
