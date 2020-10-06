'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: {
    jupiter: [
      './app/index.js',
      'react',
      'react-dom',
      'lodash'
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, 'app'), path.join(__dirname, 'lib')],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(ico|png)$/,
        loader: 'file-loader',
        query: '?name=images/[name].[ext]'
      },
      {
        test: /\.json$/,
        include: [path.resolve(__dirname, 'i18n/')],
        use: ['./lib/i18n/smartlingJsonLoader.js'],
        type: 'javascript/auto'
      }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /^helix-ui\.css$/,
      path.join(__dirname, '/node_modules/helix-ui/dist/styles/helix-ui.min.css')
    ),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.html',
      favicon: './static/favicon.ico',
      hash: true,
      inject: true,
      chunks: ['jupiter']
    }),
    /* Error page for S3 related errors, IE 404 not found */
    new HtmlWebpackPlugin({
      filename: 'error.html',
      template: 'app/error.html',
      favicon: './static/favicon.ico',
      inject: false,
      chunks: ['jupiter']
    }),
    new CopyWebpackPlugin([
      { from: 'node_modules/@webcomponents/webcomponentsjs/', to: './assets/webcomponents-2.4.0/' }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id][hash].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
