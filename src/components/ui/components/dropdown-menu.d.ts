import { type HTMLAttributes, type ReactNode } from "react";
import { type PopoverAlign, type PopoverSide } from "./popover.js";
/** Menu surface anchored to a trigger. Thin wrapper over `<Popover>`. */
export declare function DropdownMenu({ open, onOpenChange, defaultOpen, children, }: {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    children: ReactNode;
}): import("react").JSX.Element;
/** The control that toggles the menu. Renders a `<button>`. */
export declare function DropdownMenuTrigger({ children, className, ...props }: HTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
}): import("react").JSX.Element;
export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
    side?: PopoverSide;
    align?: PopoverAlign;
    sideOffset?: number;
    alignOffset?: number;
}
/** Portalled menu panel. Defaults to opening below, start-aligned. */
export declare function DropdownMenuContent({ children, className, side, align, sideOffset, alignOffset, ...props }: DropdownMenuContentProps): import("react").JSX.Element;
/** Non-interactive section heading. */
export declare function DropdownMenuLabel({ children, className, ...props }: HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
}): import("react").JSX.Element;
export interface DropdownMenuItemProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "destructive";
    disabled?: boolean;
}
/** A selectable menu row. Use `variant="destructive"` for dangerous actions. */
export declare function DropdownMenuItem({ children, className, variant, disabled, ...props }: DropdownMenuItemProps): import("react").JSX.Element;
/** 1px divider between menu groups. */
export declare function DropdownMenuSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
/** Groups `DropdownMenuRadioItem`s into a single-select set. */
export declare function DropdownMenuRadioGroup({ value, onValueChange, children, }: {
    value?: string;
    onValueChange?: (value: string) => void;
    children: ReactNode;
}): import("react").JSX.Element;
export interface DropdownMenuRadioItemProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
}
/** A radio row; shows a check when selected. */
export declare function DropdownMenuRadioItem({ children, className, value, onClick, onKeyDown, ...props }: DropdownMenuRadioItemProps): import("react").JSX.Element;
