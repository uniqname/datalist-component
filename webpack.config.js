var webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "data-list.js"
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
      ]
  },
  plugins: [new webpack.optimize.UglifyJsPlugin({minimize: true})]
};
