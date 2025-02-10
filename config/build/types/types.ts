export interface BuildsPaths {
  entry: string,
  html: string,
  output: string,
  public: string,
  src: string
}

export type BuildMode = 'production' | 'development';

export interface BuildOptions {
  port: number;
  api_url: string;
  paths: BuildsPaths;
  mode: BuildMode;
}
