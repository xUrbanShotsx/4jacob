import { type ReactNode } from "react";
export type ToastKind = "success" | "error" | "warning" | "info";
interface ToastContextValue {
    toast: (kind: ToastKind, message: string, duration?: number) => void;
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
}
/** Access the toast dispatchers. Must be used within a `<ToastProvider>`. */
export declare function useToast(): ToastContextValue;
/** Wrap the app to enable `useToast()`. Renders a bottom-right toast stack. */
export declare function ToastProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export {};
