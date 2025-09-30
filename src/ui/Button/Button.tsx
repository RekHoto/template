import React from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import Typography from "@/ui/Typography/Typography";
import cls from "./styles.module.scss";

export type ButtonVariant =
  | "primary"
  | "text"
  | "outlined"
  | "iconOnly"
  | "danger";

interface ButtonProps {
  label?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  stopPropagation?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  icon,
  stopPropagation,
  className = "",
}) => {
  const isDisabled = disabled || loading;
  const variantClass = cls[variant];

  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) e.stopPropagation();
    onClick(e);
  };

  return (
    <motion.button
      className={classNames(
        cls.button,
        variantClass,
        { [cls.disabled]: isDisabled },
        className
      )}
      onClick={click}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
    >
      {loading ? (
        <div className={cls.spinner} aria-label="Loading" />
      ) : (
        <>
          {variant === "iconOnly"
            ? icon
            : icon && <div className={cls.icon}>{icon}</div>}
          {variant !== "iconOnly" && label && (
            <Typography size="md">{label}</Typography>
          )}
        </>
      )}
    </motion.button>
  );
};

export default Button;
