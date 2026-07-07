import type { InputHTMLAttributes } from "react";
export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size">;
/** Square radio with an accent indicator. Group via a shared `name`. */
export declare function Radio({ className, ...props }: RadioProps): import("react").JSX.Element;
