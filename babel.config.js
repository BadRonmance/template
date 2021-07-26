/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-14 17:19:38
 * @LastEditTime: 2021-07-19 17:52:37
 * @LastEditors: 张泽锋
 */
const plugins = [];
const isProduction = process.env.NODE_ENV === "production";
if (isProduction) {
  // 如果是生产环境，则自动清理掉打印的日志，但保留error 与 warn
  plugins.push([
    "transform-remove-console",
    {
      // 保留 console.error 与 console.warn
      exclude: ["error", "warn"],
    }
  ])
}
module.exports = {
  plugins: [
    ...plugins,
    //element-ui按需引入
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
  presets: [
    "@vue/cli-plugin-babel/preset",
    [
      "@babel/preset-env",
      {
        modules: false,
      },
    ],
  ],
};
