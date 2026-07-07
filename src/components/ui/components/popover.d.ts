import { type HTMLAttributes, type ReactNode } from "react";
export type PopoverSide = "top" | "bottom" | "left" | "right";
export type PopoverAlign = "start" | "center" | "end";
export interface PopoverProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    children: ReactNode;
}
/** Floating panel anchored to a trigger. Controlled (`open`) or uncontrolled. */
export declare function Popover({ open: controlledOpen, onOpenChange, defaultOpen, children, }: PopoverProps): import("react").JSX.Element;
/** The element that toggles the popover. Renders a `<button>`. */
export declare function PopoverTrigger({ children, className, onClick, ...props }: HTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
}): import("react").JSX.Element;
export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
    side?: PopoverSide;
    align?: PopoverAlign;
    sideOffset?: number;
    alignOffset?: number;
}
/** Portalled, viewport-aware content. Closes on outside click / Escape. */
export declare function PopoverContent({ children, className, side, align, sideOffset, alignOffset, ...props }: PopoverContentProps): import("react").ReactPortal | null;
