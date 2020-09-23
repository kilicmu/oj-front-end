const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  chainWebpack: (config) => {
    config.plugin("monaco-editor").use(MonacoWebpackPlugin, [
      {
        // Languages are loaded on demand at runtime
        languages: ["json", "javascript", "html", "xml"],
      },
    ]);
  },
  // devServer: {
  //   proxy: "http://112.126.90.230:3000/",
  // },
};
