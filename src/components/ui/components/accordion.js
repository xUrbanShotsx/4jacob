"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useId, useMemo, useState, } from "react";
import { cn } from "../lib/utils.js";
const AccordionContext = createContext(null);
function useAccordion() {
    const ctx = useContext(AccordionContext);
    if (!ctx)
        throw new Error("Accordion subcomponents must be used inside <Accordion>");
    return ctx;
}
const ItemContext = createContext(null);
function useAccordionItem() {
    const ctx = useContext(ItemContext);
    if (!ctx)
        throw new Error("AccordionTrigger/Content must be used inside <AccordionItem>");
    return ctx;
}
/** Vertically stacked, collapsible sections. */
export function Accordion({ type = "single", defaultValue, className, children, ...props }) {
    const [openValues, setOpenValues] = useState(() => {
        if (defaultValue === undefined)
            return [];
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    });
    const isOpen = useCallback((value) => openValues.includes(value), [openValues]);
    const toggle = useCallback((value) => {
        setOpenValues((prev) => {
            const isCurrentlyOpen = prev.includes(value);
            if (type === "single")
                return isCurrentlyOpen ? [] : [value];
            return isCurrentlyOpen ? prev.filter((v) => v !== value) : [...prev, value];
        });
    }, [type]);
    const ctx = useMemo(() => ({ isOpen, toggle }), [isOpen, toggle]);
    return (_jsx(AccordionContext.Provider, { value: ctx, children: _jsx("div", { className: cn("flex w-full flex-col", className), ...props, children: children }) }));
}
/** One collapsible section. Identified by `value`. */
export function AccordionItem({ value, className, children, ...props }) {
    const { isOpen } = useAccordion();
    const baseId = useId();
    const open = isOpen(value);
    const ctx = useMemo(() => ({ value, open, triggerId: `${baseId}-trigger`, contentId: `${baseId}-content` }), [value, open, baseId]);
    return (_jsx(ItemContext.Provider, { value: ctx, children: _jsx("div", { className: cn("border-border border-b", className), ...props, children: children }) }));
}
/** The clickable header that toggles its section. */
export function AccordionTrigger({ children, className, onClick, ...props }) {
    const { toggle } = useAccordion();
    const { value, open, triggerId, contentId } = useAccordionItem();
    return (_jsxs("button", { type: "button", id: triggerId, "aria-expanded": open, "aria-controls": contentId, "data-state": open ? "open" : "closed", onClick: (e) => {
            toggle(value);
            onClick?.(e);
        }, className: cn("flex w-full cursor-pointer items-center justify-between gap-2 py-3 text-left font-medium text-[13px] text-text outline-none transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-white/10", className), ...props, children: [children, _jsx("svg", { className: cn("size-3.5 shrink-0 text-text-tertiary transition-transform duration-200", open && "rotate-180"), viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: _jsx("path", { d: "M4 6l4 4 4-4" }) })] }));
}
/** The collapsible body of a section. Rendered only when open. */
export function AccordionContent({ children, className, ...props }) {
    const { open, triggerId, contentId } = useAccordionItem();
    if (!open)
        return null;
    return (_jsx("section", { id: contentId, "aria-labelledby": triggerId, className: cn("pt-0 pb-3 text-[12px] text-text-secondary", className), ...props, children: children }));
}
