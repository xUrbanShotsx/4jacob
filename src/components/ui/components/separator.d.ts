import type { HTMLAttributes } from "react";
export interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {
    orientation?: "horizontal" | "vertical";
}
/** 1px rule in `--border`. */
export declare function Separator({ className, orientation, ...props }: SeparatorProps): import("react").JSX.Element;
