import { type HTMLAttributes, type ReactNode } from "react";
export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
    /** "single" allows one open panel; "multiple" allows many. */
    type?: "single" | "multiple";
    defaultValue?: string | string[];
}
/** Vertically stacked, collapsible sections. */
export declare function Accordion({ type, defaultValue, className, children, ...props }: AccordionProps): import("react").JSX.Element;
export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
}
/** One collapsible section. Identified by `value`. */
export declare function AccordionItem({ value, className, children, ...props }: AccordionItemProps): import("react").JSX.Element;
/** The clickable header that toggles its section. */
export declare function AccordionTrigger({ children, className, onClick, ...props }: HTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
}): import("react").JSX.Element;
/** The collapsible body of a section. Rendered only when open. */
export declare function AccordionContent({ children, className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element | null;
