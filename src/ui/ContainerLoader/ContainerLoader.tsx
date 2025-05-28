import React from "react";
import cls from "./styles.module.scss";

export interface ContainerLoaderProps {
  size?: number | string;
  borderSize?: number | string;
}

const ContainerLoader: React.FC<ContainerLoaderProps> = ({
  size = 40,
  borderSize = 4,
}) => {
  const dimension = typeof size === "number" ? `${size}px` : size;
  const bw = typeof borderSize === "number" ? `${borderSize}px` : borderSize;

  return (
    <div className={cls.wrapper}>
      <div
        className={cls.spinner}
        style={{
          width: dimension,
          height: dimension,
          borderWidth: bw,
        }}
      />
    </div>
  );
};

export default ContainerLoader;
