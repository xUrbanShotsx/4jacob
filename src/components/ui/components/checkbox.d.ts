import type { InputHTMLAttributes } from "react";
export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size">;
/** Square checkbox with an accent check. */
export declare function Checkbox({ className, ...props }: CheckboxProps): import("react").JSX.Element;
