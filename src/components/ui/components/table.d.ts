import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
/** Bordered table. Use with native `thead`/`tbody`/`tr` + `Th`/`Td`. */
export declare function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>): import("react").JSX.Element;
export declare function Th({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>): import("react").JSX.Element;
export declare function Td({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>): import("react").JSX.Element;
