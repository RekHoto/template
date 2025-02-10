import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/types";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins (options: BuildOptions): Configuration['plugins'] {
  const { paths, mode} = options;
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new DefinePlugin({
      __API_URL__: JSON.stringify(options.api_url),
      __IS_DEV__: isDev
    }),
  ]

  if (isDev) {
    plugins.push(new ForkTsCheckerWebpackPlugin())
    plugins.push(new ReactRefreshPlugin())
  }

  if (isProd) {
    plugins.push(new CopyPlugin({
      patterns: [
        { from: path.resolve(paths.public, 'images'), to: path.resolve(paths.output, 'images') }
      ]
    }))
  }

  return plugins;
}
