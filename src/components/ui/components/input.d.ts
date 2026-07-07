import { type VariantProps } from "class-variance-authority";
import type { InputHTMLAttributes } from "react";
export declare const inputVariants: (props?: ({
    inputSize?: "default" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
}
/** Text input. 36px (app) / 40px (auth via `inputSize="lg"`). */
export declare function Input({ className, inputSize, type, ...props }: InputProps): import("react").JSX.Element;
