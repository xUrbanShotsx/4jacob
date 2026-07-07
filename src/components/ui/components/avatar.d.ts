import { type VariantProps } from "class-variance-authority";
import { type HTMLAttributes, type ImgHTMLAttributes } from "react";
export declare const avatarVariants: (props?: ({
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "size">, VariantProps<typeof avatarVariants> {
    /** Shown when `src` is missing or fails to load — typically initials. */
    fallback?: string;
}
/** User avatar: square image with an initials fallback. Zero radius. */
export declare function Avatar({ className, size, src, alt, fallback, ...props }: AvatarProps): import("react").JSX.Element;
/** Overlapping cluster of avatars (apply matching `size` to each child). */
export declare function AvatarGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
