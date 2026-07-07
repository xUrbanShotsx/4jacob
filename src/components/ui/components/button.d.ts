import { type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
export declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "ghost" | "destructive" | null | undefined;
    size?: "default" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
}
/** Action control. Sharp-cornered; primary = accent-green CTA. */
export declare function Button({ className, variant, size, type, ...props }: ButtonProps): import("react").JSX.Element;
