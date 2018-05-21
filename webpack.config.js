const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
module.exports = { 
  entry: { main: glob.sync('./src/**/*.js*')} ,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  devtool: 'inline-source-map',
  watch: true,
  
  module: {
    
    rules: [
      {
        test: /\.pug$/,
        use: ["html-loader", "pug-html-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]

      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use:  [   'css-loader', 'sass-loader']
          })
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "./plugin-config/[name].[ext]"
            }
          }
        ]
      }
    ]
  },

  devServer: {
    contentBase: 'dist',
    compress: true,
    port: 3000,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CleanWebpackPlugin('dist', {}),
    new ExtractTextPlugin(
      { filename: 'style.css'}
    ),   
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.pug',
    }),
    new WebpackMd5Hash(),
  ]
};