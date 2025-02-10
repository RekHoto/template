declare module "*.module.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const cls: IClassNames;
  export = cls;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
  import React from "react";

  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
declare const __API_URL__: string;
declare const __IS_DEV__: boolean;
