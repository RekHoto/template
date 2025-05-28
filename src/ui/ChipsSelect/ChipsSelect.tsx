import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Checkbox from "@/ui/Checkbox/Checkbox";
import { OptionI } from "@/utils/types";
import cls from "./styles.module.scss";

interface ChipsSelectProps {
  options: OptionI[];
  selected: OptionI[];
  onChange: (next: OptionI[]) => void;
  placeholder?: string;
  maxVisibleChips?: number;
}

const ChipsSelect: FC<ChipsSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = "Select…",
  maxVisibleChips = 1,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const close = (e: MouseEvent) =>
      ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, []);

  const selectedValues = selected.map((o) => o.value);

  const toggle = useCallback(
    (opt: OptionI) => {
      if (selectedValues.includes(opt.value)) {
        onChange(selected.filter((o) => o.value !== opt.value));
      } else {
        onChange([...selected, opt]);
      }
    },
    [selected, selectedValues, onChange]
  );

  return (
    <div className={cls.wrapper} ref={ref}>
      <button
        type="button"
        className={cls.control}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {selected.length === 0 && (
          <span className={cls.placeholder}>{placeholder}</span>
        )}

        {selected.slice(0, maxVisibleChips).map((o) => (
          <span
            key={o.value}
            className={cls.chip}
            onClick={(e) => {
              e.stopPropagation();
              toggle(o);
            }}
          >
            {o.label} <span className={cls.remove}>×</span>
          </span>
        ))}

        {selected.length > maxVisibleChips && (
          <span className={cls.more}>+{selected.length - maxVisibleChips}</span>
        )}

        <span className={cls.arrow} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className={cls.dropdown}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {options.map((o) => (
              <li key={o.value} className={cls.item}>
                <Checkbox
                  checked={selectedValues.includes(o.value)}
                  onChange={() => toggle(o)}
                  label={o.label}
                />
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChipsSelect;
