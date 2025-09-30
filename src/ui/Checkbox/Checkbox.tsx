import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  useId,
} from "react";
import { motion } from "framer-motion";
import Typography from "@/ui/Typography/Typography";
import cls from "./styles.module.scss";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: ReactNode;
  indeterminate?: boolean;
}

const Checkbox = forwardRef(
  (
    {
      checked,
      onChange,
      indeterminate = false,
      label,
      disabled,
      id,
      ...rest
    }: CheckboxProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const autoId = useId();
    const inputId = id || autoId;

    const handle = (e: ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.checked);

    let icon = null;
    if (indeterminate && !checked) {
      icon = <rect x="2" y="7" width="12" height="2" rx="1" />;
    } else if (checked) {
      icon = <path d="M3 9l3 3 7-7" fill="none" strokeWidth="2" />;
    }

    return (
      <label
        htmlFor={inputId}
        className={cls.wrapper + (disabled ? ` ${cls.disabled}` : "")}
        aria-checked={checked}
      >
        <input
          {...rest}
          id={inputId}
          ref={ref}
          type="checkbox"
          className={cls.input}
          checked={checked}
          onChange={handle}
          disabled={disabled}
        />

        <span className={cls.box}>
          <motion.svg
            key={checked ? "checked" : "none"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.2, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {icon}
          </motion.svg>
        </span>

        {label && <Typography className={cls.label}>{label}</Typography>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
