import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const {mode} = options;
  const isDev = mode === "development";

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? '[name]_[local]__[hash:base64:5]' : '[hash:base64:8]'
      },
    },
  };

  const scssLoader = {
    test: /\.module\.(sa|sc|c)ss$/,
    use: [
      "style-loader",
      cssLoaderWithModules,
      "sass-loader",
    ],
  };
  const scssWithoutModules = {
    test: /\.(sa|sc|c)ss$/,
    exclude: /\.module\.(sa|sc|c)ss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  };

  // const tsLoader = {
  //   test: /\.tsx?$/,
  //   use: [
  //     {
  //       loader: 'ts-loader',
  //       options: {
  //         transpileOnly: true,
  //         getCustomTransformers: () => ({
  //           before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
  //         })
  //       },
  //     },
  //   ],
  //   exclude: /node_modules/,
  // };

  const babelLoader = buildBabelLoader(options);

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgrLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {icon: true}
      }
    ],
  };

  return [
    scssLoader,
    scssWithoutModules,
    // tsLoader,
    babelLoader,
    assetLoader,
    svgrLoader
  ]
}
