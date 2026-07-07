import type { HTMLAttributes } from "react";
export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    /** Completion from 0–100. Omit for an indeterminate bar. */
    value?: number;
    /** Upper bound for `value`. Defaults to 100. */
    max?: number;
}
/** Determinate progress bar. The fill uses `--text` for high contrast. */
export declare function Progress({ className, value, max, ...props }: ProgressProps): import("react").JSX.Element;
