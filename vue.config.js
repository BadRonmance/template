// const webpack = require("webpack");

const path = require("path");
// const CompressionWebpackPlugin = require("compression-webpack-plugin");
const config = require("./src/config/env");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: config.publicPath,
  outputDir: "dist",
  assetsDir: "",
  lintOnSave: process.env.NODE_ENV !== "production",
  runtimeCompiler: false,
  // babel-loader 默认会跳过 node_modules 依赖。
  // 通过这个选项可以显式转译一个依赖。
  transpileDependencies: [
    /* string or regex */
  ],

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  // 调整内部的 webpack 配置。
  chainWebpack: (config) => {
    //  !打包时对js、css文件名称进行时间戳拼接
    Splicing(config);
    //  !加载全局scss文件
    GlobalScss(config);
    //  !设置工程目录别名
    FileAlias(config);
    //  ! 图片压缩
    CompressImage(config);
    //  ! 小图片转换base64减少http请求
    ImageTransformBase(config);
    //  ! 压缩为GZIP
    // CompressGz(config);
  },
  configureWebpack: (config) => {
    // ! 拆包
    SplitFiles(config);
    // ! cdn引入
    config.externals = SetExternals();
  },

  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {},

    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false,
  },

  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require("os").cpus().length > 1,

  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-pwa
  pwa: {},

  // 配置 webpack-dev-server 行为。
  devServer: {
    proxy: {
      v2_api: {
        target: process.env.VUE_APP_URL,
        ws: false,
        changeOrigin: false,
      },
      "/file_server": {
        target: process.env.VUE_APP_FILE_URL,
        changeOrigin: true,
      },
    },
    port: 8001,
    hot: true,
    hotOnly: true,
    open: true,
  },

  // 三方插件的选项
  pluginOptions: {
    // ...
  },
};
function SplitFiles(config) {
  if (process.env.NODE_ENV === "development") return;
  console.log("vendors~app包拆分");
  // config.plugins = [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)];
  config.optimization = {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 20000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  };
}
function GlobalScss(config) {
  const oneOfsMap = config.module.rule("scss").oneOfs.store;
  oneOfsMap.forEach((item) => {
    item
      .use("sass-resources-loader")
      .loader("sass-resources-loader")
      .options({
        resources: "./src/assets/css/theme.scss",
      })
      .end();
  });
}
function FileAlias(config) {
  config.resolve.alias
    // eslint-disable-next-line no-undef
    .set("@", resolve("src"))
    // eslint-disable-next-line no-undef
    .set("@images", resolve("src/assets/images"))
    // eslint-disable-next-line no-undef
    .set("@cmp", resolve("src/components"))
    // eslint-disable-next-line no-undef
    .set("@views", resolve("src/views"))
    // eslint-disable-next-line no-undef
    .set("@libs", resolve("src/libs"));
}
function Splicing(config) {
  if (process.env.NODE_ENV === "development") return;
  const packageJson = require("./package.json");
  // !主版本号： 表示项目的重大架构变更
  // !此版本号： 表示较大范围的功能添加和变化
  // !增量版本号： 一般表示重大bug修复
  console.log("css、js名称添加版本号", packageJson.version);
  // 给js和css配置版本号
  config.output.filename("js/[name]." + packageJson.version + ".js").end();
  config.output.chunkFilename("js/[name]." + packageJson.version + ".js").end();
  config.plugin("extract-css").tap(() => [
    {
      filename: `css/[name].${packageJson.version}.css`,
      chunkFilename: `css/[name].${packageJson.version}.css`,
    },
  ]);
}
function CompressImage(config) {
  // cnpm i -D image-webpack-loader
  if (process.env.NODE_ENV === "development") return;
  config.module
    .rule("images")
    .use("image-webpack-loader")
    .loader("image-webpack-loader")
    .options({
      mozjpeg: { progressive: true, quality: 65 },
      optipng: { enabled: false },
      pngquant: { quality: [0.65, 0.9], speed: 4 },
      gifsicle: { interlaced: false },
      webp: { quality: 75 },
    });
}
// function CompressGz(config) {
//   if (process.env.NODE_ENV === "development") return;
//   //压缩成gz
//   config.plugins.push(
//     new CompressionWebpackPlugin({
//       test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
//       // 超过100kb压缩
//       threshold: 100 * 1024,
//     })
//   )
// }
function ImageTransformBase(config) {
  // 图片小于10kb转成base64，减少http请求
  if (process.env.NODE_ENV === "development") return;
  config.module
    .rule("images")
    .use("url-loader")
    .loader("url-loader")
    .tap((options) =>
      Object.assign(options, {
        limit: 10240,
      })
    );
}
function SetExternals() {
  console.log("VUE ELEMENT取消import导入");
  return {
    vue: "Vue",
    "element-ui": "ELEMENT",
  };
}
