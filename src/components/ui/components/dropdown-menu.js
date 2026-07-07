"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext } from "react";
import { cn } from "../lib/utils.js";
import { Popover, PopoverContent, PopoverTrigger, } from "./popover.js";
/** Menu surface anchored to a trigger. Thin wrapper over `<Popover>`. */
export function DropdownMenu({ open, onOpenChange, defaultOpen, children, }) {
    return (_jsx(Popover, { open: open, onOpenChange: onOpenChange, defaultOpen: defaultOpen, children: children }));
}
/** The control that toggles the menu. Renders a `<button>`. */
export function DropdownMenuTrigger({ children, className, ...props }) {
    return (_jsx(PopoverTrigger, { className: className, ...props, children: children }));
}
/** Portalled menu panel. Defaults to opening below, start-aligned. */
export function DropdownMenuContent({ children, className, side = "bottom", align = "start", sideOffset = 4, alignOffset = 0, ...props }) {
    return (_jsx(PopoverContent, { role: "menu", side: side, align: align, sideOffset: sideOffset, alignOffset: alignOffset, className: cn("min-w-[200px] max-h-[80vh] overflow-y-auto p-1 text-[12px]", className), ...props, children: children }));
}
/** Non-interactive section heading. */
export function DropdownMenuLabel({ children, className, ...props }) {
    return (_jsx("div", { className: cn("px-2 py-[5px] font-medium text-[11px] text-text-muted", className), ...props, children: children }));
}
/** A selectable menu row. Use `variant="destructive"` for dangerous actions. */
export function DropdownMenuItem({ children, className, variant = "default", disabled, ...props }) {
    return (_jsx("div", { role: "menuitem", "data-variant": variant, "aria-disabled": disabled || undefined, tabIndex: -1, className: cn("relative flex cursor-default select-none items-center gap-2 px-2 py-[5px] text-[12px] text-text-secondary outline-none transition-colors hover:bg-bg-hover hover:text-text", "data-[variant=destructive]:text-destructive-text data-[variant=destructive]:hover:bg-destructive-bg", "[&_svg]:size-3.5 [&_svg]:shrink-0", disabled && "pointer-events-none opacity-50", className), ...props, children: children }));
}
/** 1px divider between menu groups. */
export function DropdownMenuSeparator({ className, ...props }) {
    return _jsx("div", { className: cn("-mx-1 my-1 h-px bg-border", className), ...props });
}
const RadioGroupContext = createContext(null);
/** Groups `DropdownMenuRadioItem`s into a single-select set. */
export function DropdownMenuRadioGroup({ value, onValueChange, children, }) {
    return (_jsx(RadioGroupContext.Provider, { value: { value, onValueChange }, children: children }));
}
/** A radio row; shows a check when selected. */
export function DropdownMenuRadioItem({ children, className, value, onClick, onKeyDown, ...props }) {
    const ctx = useContext(RadioGroupContext);
    const selected = ctx?.value === value;
    return (_jsxs("div", { role: "menuitemradio", "aria-checked": selected, tabIndex: -1, className: cn("relative flex cursor-default select-none items-center gap-2 py-[5px] pr-8 pl-2 text-[12px] text-text-secondary outline-none transition-colors hover:bg-bg-hover hover:text-text", className), onClick: (e) => {
            ctx?.onValueChange?.(value);
            onClick?.(e);
        }, onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                ctx?.onValueChange?.(value);
            }
            onKeyDown?.(e);
        }, ...props, children: [_jsx("span", { className: "pointer-events-none absolute right-2 flex items-center justify-center", children: selected && (_jsx("svg", { className: "size-3.5 text-text", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: _jsx("path", { d: "M3 8.5l3.5 3.5L13 4" }) })) }), children] }));
}
