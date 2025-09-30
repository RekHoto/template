import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

export type TypographySize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

export type TypographyWeight = "normal" | "medium" | "semibold" | "bold";

export type TypographyFontFamily = "Inter" | "custom";

export type TypographyProps<C extends React.ElementType = "p"> = {
  size?: TypographySize;
  weight?: TypographyWeight;
  color?: string;
  family?: TypographyFontFamily;
  lineHeight?: React.CSSProperties["lineHeight"];
  component?: C;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<C>, "children" | "className">;

function Typography<C extends React.ElementType = "p">({
  size = "md",
  weight = "normal",
  family = "Inter",
  color,
  lineHeight = 1.25,
  component,
  className,
  children,
  ...rest
}: TypographyProps<C>) {
  const Component = component ?? ("p" as React.ElementType);
  const isLink = Component === "a";

  const sizeClassMap: Record<TypographySize, string> = {
    xs: styles.sizeXs,
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
    xl: styles.sizeXl,
    "2xl": styles.size2xl,
    "3xl": styles.size3xl,
    "4xl": styles.size4xl,
    "5xl": styles.size5xl,
    "6xl": styles.size6xl,
    "7xl": styles.size7xl,
    "8xl": styles.size8xl,
    "9xl": styles.size9xl,
  };

  const weightClassMap: Record<TypographyWeight, string> = {
    normal: styles.weightNormal,
    medium: styles.weightMedium,
    semibold: styles.weightSemibold,
    bold: styles.weightBold,
  };

  const familyClassMap: Record<TypographyFontFamily, string> = {
    Inter: styles.familyInter,
    custom: styles.familyCustom,
  };

  const combinedClassName = classNames(
    sizeClassMap[size],
    weightClassMap[weight],
    familyClassMap[family],
    isLink && styles.link,
    className
  );

  const restProps = rest as React.ComponentPropsWithoutRef<C>;

  const incomingStyle = (restProps as { style?: React.CSSProperties }).style;

  const overrideStyle: React.CSSProperties = {
    ...(color ? { color } : {}),
    ...(lineHeight !== undefined ? { lineHeight } : {}),
  };

  const mergedStyle: React.CSSProperties | undefined =
    Object.keys(overrideStyle).length > 0
      ? { ...(incomingStyle ?? {}), ...overrideStyle }
      : incomingStyle;

  return (
    <Component
      {...restProps}
      className={combinedClassName}
      {...(mergedStyle ? { style: mergedStyle } : {})}
    >
      {children}
    </Component>
  );
}

export default Typography;
