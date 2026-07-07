"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "../lib/utils.js";
/** Square toggle. Controlled (`checked`) or uncontrolled (`defaultChecked`). */
export function Switch({ checked, defaultChecked = false, onCheckedChange, disabled, id, className, }) {
    const [internal, setInternal] = useState(defaultChecked);
    const isChecked = checked ?? internal;
    return (_jsx("button", { type: "button", role: "switch", id: id, "aria-checked": isChecked, disabled: disabled, onClick: () => {
            const next = !isChecked;
            if (checked === undefined)
                setInternal(next);
            onCheckedChange?.(next);
        }, className: cn("inline-flex h-5 w-9 shrink-0 cursor-pointer items-center border p-0.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50", isChecked ? "border-accent-border bg-accent-bg" : "border-border-strong bg-bg-secondary", className), children: _jsx("span", { className: cn("size-3.5 transition-transform", isChecked ? "translate-x-4 bg-text" : "translate-x-0 bg-text-muted") }) }));
}
