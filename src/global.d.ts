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

declare const __API_URL__: string;
declare const __IS_DEV__: boolean;
