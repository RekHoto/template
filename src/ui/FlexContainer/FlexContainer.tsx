import React, { CSSProperties, HTMLAttributes, ReactNode } from "react";

type Gap = number | string;

interface FlexContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  gap?: Gap;
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
}

export const FlexRow: React.FC<FlexContainerProps> = ({
  children,
  gap = 8,
  alignItems = "center",
  justifyContent = "flex-start",
  style,
  ...rest
}) => {
  const inline: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    gap: typeof gap === "number" ? `${gap}px` : gap,
    alignItems,
    justifyContent,
    ...style,
  };

  return (
    <div style={inline} {...rest}>
      {children}
    </div>
  );
};

export const FlexColumn: React.FC<FlexContainerProps> = ({
  children,
  gap = 8,
  alignItems = "stretch",
  justifyContent = "flex-start",
  style,
  ...rest
}) => {
  const inline: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: typeof gap === "number" ? `${gap}px` : gap,
    alignItems,
    justifyContent,
    ...style,
  };

  return (
    <div style={inline} {...rest}>
      {children}
    </div>
  );
};

export default FlexColumn;
