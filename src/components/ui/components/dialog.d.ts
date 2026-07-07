import { type HTMLAttributes, type ReactNode } from "react";
export interface DialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    children: ReactNode;
}
/** Modal dialog. Controlled (`open`) or uncontrolled (`defaultOpen`). */
export declare function Dialog({ open: controlledOpen, onOpenChange, defaultOpen, children, }: DialogProps): import("react").JSX.Element;
/** The control that opens the dialog. Renders a `<button>`. */
export declare function DialogTrigger({ children, className, onClick, ...props }: HTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
}): import("react").JSX.Element;
export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Whether clicking the backdrop closes the dialog. Defaults to `true`. */
    dismissable?: boolean;
}
/** Portalled, centered modal panel with a backdrop. Closes on Escape. */
export declare function DialogContent({ children, className, dismissable, ...props }: DialogContentProps): import("react").ReactPortal | null;
/** Stacked title + description block at the top of the dialog. */
export declare function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
/** Right-aligned action row at the bottom of the dialog. */
export declare function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
/** The dialog's accessible title. Wires up `aria-labelledby`. */
export declare function DialogTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>): import("react").JSX.Element;
/** Supporting copy under the title. Wires up `aria-describedby`. */
export declare function DialogDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>): import("react").JSX.Element;
/** A button that closes the dialog. Renders a `<button>`. */
export declare function DialogClose({ children, className, onClick, ...props }: HTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
}): import("react").JSX.Element;
