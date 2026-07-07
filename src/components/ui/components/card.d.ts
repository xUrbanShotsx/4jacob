import { type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
export declare const cardVariants: (props?: ({
    variant?: "default" | "elevated" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type DivProps = HTMLAttributes<HTMLDivElement>;
export interface CardProps extends DivProps, VariantProps<typeof cardVariants> {
}
/** Surface container. `elevated` for popovers/floating panels. Sharp corners. */
export declare function Card({ className, variant, ...props }: CardProps): import("react").JSX.Element;
export declare function CardHeader({ className, ...props }: DivProps): import("react").JSX.Element;
export declare function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>): import("react").JSX.Element;
export declare function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>): import("react").JSX.Element;
export declare function CardContent({ className, ...props }: DivProps): import("react").JSX.Element;
export declare function CardFooter({ className, ...props }: DivProps): import("react").JSX.Element;
export {};
