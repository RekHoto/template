import React from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/ui/Modal/Modal";
import Button, { ButtonVariant } from "@/ui/Button/Button";
import Typography from "@/ui/Typography/Typography";
import cls from "./styles.module.scss";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description?: string | React.ReactNode;
  confirmText?: string;
  confirmVariant?: ButtonVariant;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  confirmVariant,
  onCancel,
  title,
  description,
  confirmText,
  cancelText,
}) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className={cls.container}>
        <Typography variant="h5">{title}</Typography>
        {description && (
          <Typography className={cls.description} variant="body1">
            {description}
          </Typography>
        )}
        <div className={cls.actions}>
          <Button
            variant={confirmVariant ?? "primary"}
            onClick={onConfirm}
            label={confirmText ?? t("delete")}
          />
          <Button
            variant="outlined"
            onClick={onCancel}
            label={cancelText ?? t("cancel")}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
