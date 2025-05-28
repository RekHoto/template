import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import cls from "./styles.module.scss";

interface TooltipProps {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  position = "top",
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className={cls.tooltipWrapper}
      ref={triggerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            className={classNames(cls.tooltip, cls[position])}
            initial={{
              opacity: 0,
              y: position === "top" ? 5 : position === "bottom" ? -5 : 0,
              x: position === "left" ? 5 : position === "right" ? -5 : 0,
            }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{
              opacity: 0,
              y: position === "top" ? 5 : position === "bottom" ? -5 : 0,
              x: position === "left" ? 5 : position === "right" ? -5 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
