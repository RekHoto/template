import "@/styles/base.scss";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import cls from "./styles.module.scss";

export const App: FC = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.container}>
        <Outlet />
      </div>
    </div>
  );
};
