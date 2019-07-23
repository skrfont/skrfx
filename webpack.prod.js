/* eslint-disable */

//const path = require("path");
const webpack = require("webpack");

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      // context: __dirname,
      context: process.cwd(),
      manifest: require('./node_modules/@skrfont/vendor/vendor/rxjs-manifest.json')
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'report.html',
      openAnalyzer: true,
      logLevel: 'info'
    })
  ]
};
