import React from "react";
import classNames from "classnames";
import cls from "./styles.module.scss";

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

const Panel: React.FC<PanelProps> = ({ children, className }) => {
  return <div className={classNames(cls.wrapper, className)}>{children}</div>;
};

export default Panel;
