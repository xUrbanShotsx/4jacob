"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../lib/utils.js";
const SIZE = { default: "h-9 text-[12px]", lg: "h-10 text-[13px]" };
/** Custom select: styled trigger + popover listbox with keyboard nav.
 *  (A native `<select>` can't style its options.) */
export function Select({ options, value, defaultValue, onValueChange, placeholder = "Select…", selectSize = "default", disabled, id, className, }) {
    const [internal, setInternal] = useState(defaultValue ?? "");
    const current = value ?? internal;
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const ref = useRef(null);
    const listId = useId();
    const optId = (i) => `${listId}-opt-${i}`;
    const selected = options.find((o) => o.value === current);
    useEffect(() => {
        if (!open)
            return;
        const onDoc = (e) => {
            if (ref.current && !ref.current.contains(e.target))
                setOpen(false);
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, [open]);
    function choose(opt) {
        if (opt.disabled)
            return;
        if (value === undefined)
            setInternal(opt.value);
        onValueChange?.(opt.value);
        setOpen(false);
    }
    function move(dir) {
        setActive((i) => {
            let next = i;
            for (let s = 0; s < options.length; s++) {
                next = (next + dir + options.length) % options.length;
                if (!options[next]?.disabled)
                    break;
            }
            return next;
        });
    }
    function onKeyDown(e) {
        if (disabled)
            return;
        if (e.key === "Escape")
            return setOpen(false);
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!open)
                return setOpen(true);
            move(e.key === "ArrowDown" ? 1 : -1);
        }
        else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!open)
                return setOpen(true);
            const opt = options[active];
            if (opt)
                choose(opt);
        }
    }
    return (_jsxs("div", { ref: ref, className: "relative", children: [_jsxs("button", { type: "button", id: id, role: "combobox", "aria-expanded": open, "aria-haspopup": "listbox", "aria-controls": listId, "aria-activedescendant": open ? optId(active) : undefined, disabled: disabled, onClick: () => !disabled && setOpen((o) => !o), onKeyDown: onKeyDown, className: cn("flex w-full cursor-pointer items-center justify-between gap-2 border border-border bg-bg-secondary py-0 pr-2 pl-3 font-medium text-text outline-none transition-all hover:border-border-hover focus:border-border-hover focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50", SIZE[selectSize], className), children: [_jsx("span", { className: cn("truncate", !selected && "text-text-placeholder"), children: selected ? selected.label : placeholder }), _jsx("svg", { className: "size-3.5 shrink-0 text-text-tertiary", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: _jsx("path", { d: "M4 6l4 4 4-4" }) })] }), open && (_jsx("div", { id: listId, role: "listbox", className: "absolute z-50 mt-1 max-h-60 w-full overflow-auto border border-border bg-bg-secondary py-1 shadow-[0_8px_24px_rgba(0,0,0,0.4)]", children: options.map((opt, i) => {
                    const isSelected = opt.value === current;
                    return (_jsxs("button", { type: "button", id: optId(i), role: "option", "aria-selected": isSelected, disabled: opt.disabled, onMouseEnter: () => setActive(i), onClick: () => choose(opt), className: cn("flex w-full cursor-pointer items-center justify-between px-3 py-1.5 text-left text-[12px] text-text disabled:cursor-not-allowed disabled:opacity-50", i === active && "bg-bg-hover"), children: [_jsx("span", { className: "truncate", children: opt.label }), isSelected && _jsx("span", { className: "text-accent-text", children: "\u2713" })] }, opt.value));
                }) }))] }));
}
