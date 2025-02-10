import cn from "classnames";
import {
  CommonModal,
  CommonModalPropsI,
} from "@/ui/modals/CommonModal/CommonModal";
import React from "react";
import cls from "./BottomModal.module.scss";

export const BottomModal: React.FC<CommonModalPropsI> = ({
  containerClass,
  children,
  ...rest
}) => {
  return (
    <CommonModal containerClass={cn(cls.container, containerClass)} {...rest}>
      {children}
    </CommonModal>
  );
};
