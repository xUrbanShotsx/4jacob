"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState, } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils.js";
const DialogContext = createContext(null);
function useDialog() {
    const ctx = useContext(DialogContext);
    if (!ctx)
        throw new Error("Dialog subcomponents must be used inside <Dialog>");
    return ctx;
}
/** Modal dialog. Controlled (`open`) or uncontrolled (`defaultOpen`). */
export function Dialog({ open: controlledOpen, onOpenChange, defaultOpen = false, children, }) {
    const [uncontrolled, setUncontrolled] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolled;
    const titleId = useId();
    const descId = useId();
    const setOpen = useCallback((next) => {
        if (!isControlled)
            setUncontrolled(next);
        onOpenChange?.(next);
    }, [isControlled, onOpenChange]);
    const value = useMemo(() => ({ open, setOpen, titleId, descId }), [open, setOpen, titleId, descId]);
    return _jsx(DialogContext.Provider, { value: value, children: children });
}
/** The control that opens the dialog. Renders a `<button>`. */
export function DialogTrigger({ children, className, onClick, ...props }) {
    const { setOpen } = useDialog();
    return (_jsx("button", { type: "button", className: className, onClick: (e) => {
            setOpen(true);
            onClick?.(e);
        }, ...props, children: children }));
}
/** Portalled, centered modal panel with a backdrop. Closes on Escape. */
export function DialogContent({ children, className, dismissable = true, ...props }) {
    const { open, setOpen, titleId, descId } = useDialog();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {
        if (!open)
            return;
        const onKeyDown = (e) => {
            if (e.key === "Escape")
                setOpen(false);
        };
        document.addEventListener("keydown", onKeyDown);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prev;
        };
    }, [open, setOpen]);
    if (!mounted || !open)
        return null;
    return createPortal(
    // biome-ignore lint/a11y/noStaticElementInteractions: backdrop click is a convenience; Escape is the accessible dismissal path
    // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard dismissal is handled by the Escape listener above
    _jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4", onClick: (e) => {
            if (dismissable && e.target === e.currentTarget)
                setOpen(false);
        }, children: _jsx("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, "aria-describedby": descId, "data-state": "open", className: cn("relative w-full max-w-md border border-border bg-bg-secondary p-5 text-text shadow-[0_8px_24px_rgba(0,0,0,0.4)] outline-none", className), ...props, children: children }) }), document.body);
}
/** Stacked title + description block at the top of the dialog. */
export function DialogHeader({ className, ...props }) {
    return _jsx("div", { className: cn("mb-4 flex flex-col gap-1.5", className), ...props });
}
/** Right-aligned action row at the bottom of the dialog. */
export function DialogFooter({ className, ...props }) {
    return (_jsx("div", { className: cn("mt-6 flex flex-wrap items-center justify-end gap-2", className), ...props }));
}
/** The dialog's accessible title. Wires up `aria-labelledby`. */
export function DialogTitle({ className, ...props }) {
    const { titleId } = useDialog();
    return (_jsx("h2", { id: titleId, className: cn("font-semibold text-[15px] text-text leading-tight", className), ...props }));
}
/** Supporting copy under the title. Wires up `aria-describedby`. */
export function DialogDescription({ className, ...props }) {
    const { descId } = useDialog();
    return _jsx("p", { id: descId, className: cn("text-[12px] text-text-secondary", className), ...props });
}
/** A button that closes the dialog. Renders a `<button>`. */
export function DialogClose({ children, className, onClick, ...props }) {
    const { setOpen } = useDialog();
    return (_jsx("button", { type: "button", className: className, onClick: (e) => {
            setOpen(false);
            onClick?.(e);
        }, ...props, children: children }));
}
