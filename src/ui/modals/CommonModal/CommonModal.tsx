import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import cn from "classnames";
import cls from "./CommonModal.module.scss";
import { scroll } from "./scroll";

export interface CommonModalPropsI {
  isOpen: boolean;
  close: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
  rootChildren?: React.ReactNode;
  rootClass?: string;
  containerClass?: string;
  backdropClass?: string;
}

const root = document.querySelector("#modal-root") as Element;

export const CommonModal: React.FC<CommonModalPropsI> = ({
  isOpen,
  onClose,
  close,
  children,
  rootClass,
  containerClass,
  backdropClass,
  rootChildren,
}) => {
  const [waitAnimation, setWaitAnimation] = useState<boolean>(isOpen);

  useEffect(() => {
    let timer = 0;

    if (!isOpen) {
      timer = window.setTimeout(() => {
        setWaitAnimation(false);
      }, 300);
    } else {
      timer = window.setTimeout(() => {
        setWaitAnimation(true);
      }, 0);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => e.preventDefault();

    if (isOpen) {
      document.addEventListener("touchmove", preventDefault, {
        passive: false,
      });
    }

    return () => {
      document.removeEventListener("touchmove", preventDefault);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scroll.disable();
    } else {
      scroll.enable();
    }

    return () => {
      scroll.enable();
    };
  }, [isOpen]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }

    close();
  };

  return isOpen || waitAnimation
    ? createPortal(
        <section
          className={cn(cls.root, rootClass)}
          data-open={isOpen ? waitAnimation : isOpen}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            className={cn(cls.backdrop, backdropClass)}
            type="button"
            onClick={handleClose}
          />
          <div className={cn(cls.container, containerClass)}>
            <button
              className={cls.closeBtn}
              type="button"
              onClick={handleClose}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.921875 11.4531C0.791667 11.3229 0.705729 11.1719 0.664062 11C0.622396 10.8229 0.622396 10.6484 0.664062 10.4766C0.705729 10.3047 0.789062 10.1562 0.914062 10.0312L4.57812 6.36719L0.914062 2.71094C0.789062 2.58594 0.705729 2.4375 0.664062 2.26562C0.622396 2.09375 0.622396 1.92188 0.664062 1.75C0.705729 1.57292 0.791667 1.41927 0.921875 1.28906C1.04688 1.16406 1.19531 1.08073 1.36719 1.03906C1.54427 0.992188 1.71875 0.992188 1.89062 1.03906C2.06771 1.08073 2.21875 1.16146 2.34375 1.28125L6 4.94531L9.66406 1.28906C9.78906 1.16406 9.9349 1.08073 10.1016 1.03906C10.2734 0.992188 10.4453 0.992188 10.6172 1.03906C10.7943 1.08073 10.9453 1.16667 11.0703 1.29688C11.2057 1.42188 11.2943 1.57292 11.3359 1.75C11.3776 1.92188 11.3776 2.09375 11.3359 2.26562C11.2943 2.4375 11.2083 2.58594 11.0781 2.71094L7.42969 6.36719L11.0781 10.0312C11.2083 10.1562 11.2943 10.3047 11.3359 10.4766C11.3776 10.6484 11.3776 10.8229 11.3359 11C11.2943 11.1719 11.2057 11.3203 11.0703 11.4453C10.9453 11.5755 10.7943 11.6641 10.6172 11.7109C10.4453 11.7526 10.2734 11.7526 10.1016 11.7109C9.9349 11.6693 9.78906 11.5833 9.66406 11.4531L6 7.79688L2.34375 11.4609C2.21875 11.5807 2.06771 11.6641 1.89062 11.7109C1.71875 11.7526 1.54427 11.7526 1.36719 11.7109C1.19531 11.6641 1.04688 11.5781 0.921875 11.4531Z"
                  fill="#7F7F7F"
                  fillOpacity="0.5"
                />
                <path
                  d="M0.921875 11.4531C0.791667 11.3229 0.705729 11.1719 0.664062 11C0.622396 10.8229 0.622396 10.6484 0.664062 10.4766C0.705729 10.3047 0.789062 10.1562 0.914062 10.0312L4.57812 6.36719L0.914062 2.71094C0.789062 2.58594 0.705729 2.4375 0.664062 2.26562C0.622396 2.09375 0.622396 1.92188 0.664062 1.75C0.705729 1.57292 0.791667 1.41927 0.921875 1.28906C1.04688 1.16406 1.19531 1.08073 1.36719 1.03906C1.54427 0.992188 1.71875 0.992188 1.89062 1.03906C2.06771 1.08073 2.21875 1.16146 2.34375 1.28125L6 4.94531L9.66406 1.28906C9.78906 1.16406 9.9349 1.08073 10.1016 1.03906C10.2734 0.992188 10.4453 0.992188 10.6172 1.03906C10.7943 1.08073 10.9453 1.16667 11.0703 1.29688C11.2057 1.42188 11.2943 1.57292 11.3359 1.75C11.3776 1.92188 11.3776 2.09375 11.3359 2.26562C11.2943 2.4375 11.2083 2.58594 11.0781 2.71094L7.42969 6.36719L11.0781 10.0312C11.2083 10.1562 11.2943 10.3047 11.3359 10.4766C11.3776 10.6484 11.3776 10.8229 11.3359 11C11.2943 11.1719 11.2057 11.3203 11.0703 11.4453C10.9453 11.5755 10.7943 11.6641 10.6172 11.7109C10.4453 11.7526 10.2734 11.7526 10.1016 11.7109C9.9349 11.6693 9.78906 11.5833 9.66406 11.4531L6 7.79688L2.34375 11.4609C2.21875 11.5807 2.06771 11.6641 1.89062 11.7109C1.71875 11.7526 1.54427 11.7526 1.36719 11.7109C1.19531 11.6641 1.04688 11.5781 0.921875 11.4531Z"
                  fill="#C2C2C2"
                />
              </svg>
            </button>
            {children}
          </div>
          {rootChildren}
        </section>,
        root
      )
    : null;
};
