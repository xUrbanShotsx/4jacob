import { type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
export declare const badgeVariants: (props?: ({
    variant?: "status" | "primary" | "blue" | "yellow" | "green" | "coral" | "neutral" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
}
/** Compact status/label pill. 9px uppercase, sharp corners. */
export declare function Badge({ className, variant, ...props }: BadgeProps): import("react").JSX.Element;
