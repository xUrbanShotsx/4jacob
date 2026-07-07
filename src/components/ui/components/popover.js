"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils.js";
const PopoverContext = createContext(null);
function usePopover() {
    const ctx = useContext(PopoverContext);
    if (!ctx)
        throw new Error("Popover subcomponents must be used inside <Popover>");
    return ctx;
}
/** Floating panel anchored to a trigger. Controlled (`open`) or uncontrolled. */
export function Popover({ open: controlledOpen, onOpenChange, defaultOpen = false, children, }) {
    const [uncontrolled, setUncontrolled] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolled;
    const triggerRef = useRef(null);
    const contentId = useId();
    const setOpen = useCallback((next) => {
        if (!isControlled)
            setUncontrolled(next);
        onOpenChange?.(next);
    }, [isControlled, onOpenChange]);
    const value = useMemo(() => ({ open, setOpen, triggerRef, contentId }), [open, setOpen, contentId]);
    return _jsx(PopoverContext.Provider, { value: value, children: children });
}
/** The element that toggles the popover. Renders a `<button>`. */
export function PopoverTrigger({ children, className, onClick, ...props }) {
    const { open, setOpen, triggerRef, contentId } = usePopover();
    return (_jsx("button", { type: "button", ref: triggerRef, "aria-haspopup": "dialog", "aria-expanded": open, "aria-controls": contentId, "data-state": open ? "open" : "closed", className: className, onClick: (e) => {
            setOpen(!open);
            onClick?.(e);
        }, ...props, children: children }));
}
/** Portalled, viewport-aware content. Closes on outside click / Escape. */
export function PopoverContent({ children, className, side = "bottom", align = "center", sideOffset = 4, alignOffset = 0, ...props }) {
    const { open, setOpen, triggerRef, contentId } = usePopover();
    const contentRef = useRef(null);
    const [coords, setCoords] = useState(null);
    const [mounted, setMounted] = useState(false);
    useLayoutEffect(() => {
        setMounted(true);
    }, []);
    const updatePosition = useCallback(() => {
        const trigger = triggerRef.current;
        const content = contentRef.current;
        if (!trigger || !content)
            return;
        const t = trigger.getBoundingClientRect();
        const c = content.getBoundingClientRect();
        let top = 0;
        let left = 0;
        switch (side) {
            case "bottom":
                top = t.bottom + sideOffset;
                break;
            case "top":
                top = t.top - c.height - sideOffset;
                break;
            case "left":
                left = t.left - c.width - sideOffset;
                top = t.top;
                break;
            case "right":
                left = t.right + sideOffset;
                top = t.top;
                break;
        }
        if (side === "top" || side === "bottom") {
            if (align === "start")
                left = t.left + alignOffset;
            else if (align === "center")
                left = t.left + (t.width - c.width) / 2 + alignOffset;
            else
                left = t.right - c.width + alignOffset;
        }
        else {
            if (align === "start")
                top = t.top + alignOffset;
            else if (align === "center")
                top = t.top + (t.height - c.height) / 2 + alignOffset;
            else
                top = t.bottom - c.height + alignOffset;
        }
        const pad = 8;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        if (left + c.width > vw - pad)
            left = Math.max(pad, vw - c.width - pad);
        if (left < pad)
            left = pad;
        if (top + c.height > vh - pad)
            top = Math.max(pad, vh - c.height - pad);
        if (top < pad)
            top = pad;
        setCoords({ top, left });
    }, [side, align, sideOffset, alignOffset, triggerRef]);
    useLayoutEffect(() => {
        if (!open) {
            setCoords(null);
            return;
        }
        updatePosition();
    }, [open, updatePosition]);
    useEffect(() => {
        if (!open)
            return;
        const handle = () => updatePosition();
        window.addEventListener("resize", handle);
        window.addEventListener("scroll", handle, true);
        return () => {
            window.removeEventListener("resize", handle);
            window.removeEventListener("scroll", handle, true);
        };
    }, [open, updatePosition]);
    useEffect(() => {
        if (!open)
            return;
        const onPointerDown = (e) => {
            const target = e.target;
            if (!target)
                return;
            if (contentRef.current?.contains(target))
                return;
            if (triggerRef.current?.contains(target))
                return;
            setOpen(false);
        };
        const onKeyDown = (e) => {
            if (e.key === "Escape")
                setOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open, setOpen, triggerRef]);
    if (!mounted || !open)
        return null;
    return createPortal(_jsx("div", { ref: contentRef, id: contentId, role: "dialog", "data-side": side, "data-align": align, "data-state": "open", style: {
            position: "fixed",
            top: coords?.top ?? 0,
            left: coords?.left ?? 0,
            visibility: coords ? "visible" : "hidden",
            zIndex: 50,
        }, className: cn("min-w-[200px] border border-border bg-bg-secondary p-3 text-text shadow-[0_8px_24px_rgba(0,0,0,0.4)] outline-none", className), ...props, children: children }), document.body);
}
