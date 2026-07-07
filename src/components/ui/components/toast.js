"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useRef, useState, } from "react";
const noop = () => { };
const ToastContext = createContext({
    toast: noop,
    success: noop,
    error: noop,
    warning: noop,
    info: noop,
});
/** Access the toast dispatchers. Must be used within a `<ToastProvider>`. */
export function useToast() {
    return useContext(ToastContext);
}
const KIND = {
    success: { label: "Success", color: "var(--badge-green-text)" },
    error: { label: "Error", color: "var(--destructive-text)" },
    warning: { label: "Warning", color: "var(--badge-yellow-text)" },
    info: { label: "Information", color: "var(--badge-blue-text)" },
};
/** Wrap the app to enable `useToast()`. Renders a bottom-right toast stack. */
export function ToastProvider({ children }) {
    const [items, setItems] = useState([]);
    const idRef = useRef(0);
    const dismiss = useCallback((id) => {
        setItems((list) => list.filter((t) => t.id !== id));
    }, []);
    const toast = useCallback((kind, message, duration = 4000) => {
        const id = idRef.current++;
        setItems((list) => [...list, { id, kind, message, duration }]);
    }, []);
    const success = useCallback((message, duration) => toast("success", message, duration), [toast]);
    const error = useCallback((message, duration) => toast("error", message, duration), [toast]);
    const warning = useCallback((message, duration) => toast("warning", message, duration), [toast]);
    const info = useCallback((message, duration) => toast("info", message, duration), [toast]);
    return (_jsxs(ToastContext.Provider, { value: { toast, success, error, warning, info }, children: [children, _jsx("div", { className: "pointer-events-none fixed right-6 bottom-6 z-50 flex flex-col gap-3", children: items.map((t) => (_jsx(Toast, { item: t, onDismiss: () => dismiss(t.id) }, t.id))) })] }));
}
function Toast({ item, onDismiss }) {
    useEffect(() => {
        const timer = setTimeout(onDismiss, item.duration);
        return () => clearTimeout(timer);
    }, [onDismiss, item.duration]);
    const { label, color } = KIND[item.kind];
    return (_jsxs("div", { role: "status", className: "pointer-events-auto flex min-w-[280px] max-w-sm items-start gap-3 border border-border bg-bg-secondary px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.4)]", children: [_jsx("span", { className: "mt-[3px] size-2 shrink-0", style: { backgroundColor: color } }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-semibold text-[11px] uppercase tracking-wider", style: { color }, children: label }), _jsx("div", { className: "mt-0.5 text-[12px] text-text", children: item.message })] }), _jsx("button", { type: "button", onClick: onDismiss, "aria-label": "Dismiss", className: "cursor-pointer text-[14px] text-text-muted leading-none transition-colors hover:text-text", children: "\u00D7" })] }));
}
