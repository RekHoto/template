import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import fadeCls from "@/styles/extra/FadeTransition.module.scss";
import cls from "./styles.module.scss";

import { useAlert } from "@/store/alert";

const DURATION = 5000;

export const Alert = () => {
  const nodeRef = useRef(null);
  const timer = useRef<number>(-1);
  const { data, hide } = useAlert();

  useEffect(() => {
    if (data) {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(hide, DURATION);
    }
  }, [data]);

  useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  return (
    <CSSTransition
      classNames={{ ...fadeCls }}
      timeout={200}
      in={!!data}
      nodeRef={nodeRef}
      unmountOnExit
    >
      {data ? (
        <div
          className={cls.root}
          data-type={data.type}
          ref={nodeRef}
          key="alert"
        >
          <p>{data.text}</p>
          <button type="button" onClick={hide}>
            X
          </button>
        </div>
      ) : (
        <div />
      )}
    </CSSTransition>
  );
};
