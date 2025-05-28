import React, { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cls from "./styles.module.scss";

interface InputProps {
  id?: string;
  label?: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  value: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  hint,
  error,
  disabled = false,
  required,
  onChange,
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [showPassword, setShowPassword] = useState(false);
  const passwordType = showPassword ? "text" : "password";
  const inputType = type === "password" ? passwordType : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <AnimatePresence>
      <div className={cls.inputContainer}>
        {label && (
          <label className={cls.label} htmlFor={inputId}>
            {required && <span>* </span>}
            {label}
          </label>
        )}
        <div className={cls.inputWrapper}>
          <input
            id={inputId}
            type={inputType}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            className={`${cls.input} ${error ? cls.errorInput : ""} ${
              disabled ? cls.disabledInput : ""
            }`}
            onChange={(e) => onChange(e.target.value)}
          />
          {type === "password" && (
            <button
              type="button"
              className={cls.toggleButton}
              onClick={togglePasswordVisibility}
              disabled={disabled}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          )}
        </div>
        {error && (
          <motion.div
            className={cls.errorText}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {error}
          </motion.div>
        )}
        {hint && (
          <motion.div
            className={cls.hintText}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {hint}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default Input;
