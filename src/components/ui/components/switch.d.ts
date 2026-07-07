export interface SwitchProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    id?: string;
    className?: string;
}
/** Square toggle. Controlled (`checked`) or uncontrolled (`defaultChecked`). */
export declare function Switch({ checked, defaultChecked, onCheckedChange, disabled, id, className, }: SwitchProps): import("react").JSX.Element;
