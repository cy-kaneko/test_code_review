const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "kintoneUIComponent",
    libraryTarget: "umd",
    filename: "kintone-ui-component-dist.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/\bcore-js\b/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      ie: 11
                    },
                    useBuiltIns: "entry",
                    corejs: 3
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".png"]
  }
};
