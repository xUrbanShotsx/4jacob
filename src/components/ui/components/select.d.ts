export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface SelectProps {
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    selectSize?: "default" | "lg";
    disabled?: boolean;
    id?: string;
    className?: string;
}
/** Custom select: styled trigger + popover listbox with keyboard nav.
 *  (A native `<select>` can't style its options.) */
export declare function Select({ options, value, defaultValue, onValueChange, placeholder, selectSize, disabled, id, className, }: SelectProps): import("react").JSX.Element;
