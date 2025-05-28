// Typography.tsx
import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "body3"
  | "caption";

const defaultVariantMapping: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body1: "p",
  body2: "p",
  body3: "p",
  caption: "p",
};

const variantClasses: Record<TypographyVariant, string> = {
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  h4: styles.h4,
  h5: styles.h5,
  h6: styles.h6,
  body1: styles.body1,
  body2: styles.body2,
  body3: styles.body3,
  caption: styles.caption,
};

/**
 * Polymorphic props: you get all the props for whatever component you choose.
 * C defaults to 'p', so if you don’t pass `component` it types like a <p>.
 */
export type TypographyProps<C extends React.ElementType> = {
  variant?: TypographyVariant;
  component?: C;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<C>, "children" | "className">;

function Typography<C extends React.ElementType = "p">({
  variant = "body1",
  component,
  className,
  children,
  ...rest
}: TypographyProps<C>) {
  const Component = component || defaultVariantMapping[variant];
  const isLink = Component === "a";
  const combinedClassName = classNames(
    variantClasses[variant],
    isLink && styles.link,
    className
  );

  return (
    <Component className={combinedClassName} {...rest}>
      {children}
    </Component>
  );
}

export default Typography;
