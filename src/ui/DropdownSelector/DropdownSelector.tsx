import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cls from "./styles.module.scss";

export interface Option {
  value: string;
  label: string;
}

interface DropdownSelectorProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  value: string;
  onChange: (option: string) => void;
  error?: string;
  className?: string;
}

type Placement = "bottom" | "top";

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<Placement>("bottom");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value);

  const choose = (opt: Option) => {
    onChange(opt.value);
    setOpen(false);
  };

  /* ------- close on outside click ------- */
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) =>
      wrapperRef.current &&
      !wrapperRef.current.contains(e.target as Node) &&
      setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  /* ------- decide top / bottom -------- */
  useLayoutEffect(() => {
    if (!open) return;
    const wrap = wrapperRef.current;
    const list = listRef.current;
    if (!wrap || !list) return;

    const wrapRect = wrap.getBoundingClientRect();
    const below = window.innerHeight - wrapRect.bottom;
    const above = wrapRect.top;
    const need = list.offsetHeight + 8; // 4 px gap each side

    setPlacement(below >= need || below >= above ? "bottom" : "top");
  }, [open, options.length]); // re-run if options change

  return (
    <div ref={wrapperRef} className={`${cls.dropdownContainer} ${className}`}>
      {label && <label className={cls.label}>{label}</label>}

      <div className={cls.dropdownControl} onClick={() => setOpen((p) => !p)}>
        <span className={cls.selectedValue}>
          {selected ? selected.label : placeholder || ""}
        </span>
        <span className={cls.caret} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            key="list"
            className={`${cls.optionsList} ${
              placement === "top" ? cls.top : cls.bottom
            }`}
            initial={{ opacity: 0, y: placement === "top" ? 5 : -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placement === "top" ? 5 : -5 }}
            transition={{ duration: 0.18 }}
          >
            {options.map((o) => (
              <li
                key={o.value}
                className={cls.optionItem}
                onClick={() => choose(o)}
              >
                {o.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            key="err"
            className={cls.errorText}
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownSelector;
