const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HTMLInlineCSSPlugin = require("html-inline-css-webpack-plugin").default;
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = {
  entry: `./src/index.ts`,
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {
            // make all svg images to work in IE
            iesafe: true,
          },
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: path.resolve(__dirname, '../electron-desktop/build/images'),
        },
      ]
    }),
    new MiniCssExtractPlugin(),
    new HtmlInlineScriptPlugin(),
    new HtmlPlugin({
      title: 'web-pecker-example',
      filename: 'index.html',
      template: `src/index.html`,
      favicon: `src/favicon.ico`,
    }),
    new HTMLInlineCSSPlugin(),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
  output: {
    path: path.resolve(__dirname, '../electron-desktop/build'),
    publicPath: './',
    clean: true,
  },
};
