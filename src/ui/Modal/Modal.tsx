// src/components/Modal/Modal.tsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/utils/hooks/useIsMobile";
import { CloseIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const preventScroll = (e: Event) => e.preventDefault();

    document.addEventListener("keydown", onKey);
    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [isOpen, onClose]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: isMobile ? 1 : 0.8,
      y: isMobile ? "100%" : "-50%",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: isMobile ? "0%" : "-50%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      opacity: 0,
      scale: isMobile ? 1 : 0.8,
      y: isMobile ? "100%" : "-50%",
      transition: { duration: 0.2 },
    },
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlayWrapper}>
          <motion.div
            className={styles.backdrop}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            className={styles.modalWrapper}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          >
            <div
              className={styles.modalHeader}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" onClick={onClose}>
                <CloseIcon />
              </button>
            </div>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
