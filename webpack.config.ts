import dotenv from "dotenv";
import path from "path";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildsPaths } from "./config/build/types/types";

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  REACT_APP_API_URL: string;
  REACT_APP_GOOGLE_ANALYTICS_ID: string;
  REACT_APP_DEPLOYMENT_HOST: string;
}

export default (env: EnvVariables) => {
  dotenv.config(); // Ensure dotenv is configured before accessing env variables
  const dot = process.env;
  const paths: BuildsPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    public: path.resolve(__dirname, "public"),
    src: path.resolve(__dirname, "src"),
  };

  return buildWebpack({
    port: env.port ?? 5000,
    mode: env.mode ?? "development",
    api_url: dot.REACT_APP_API_URL ?? env.REACT_APP_API_URL ?? "",
    paths,
  });
};
