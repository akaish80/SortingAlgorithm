const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

// minify webpack config parts

exports.minifyJavaScript = ({ sourceMap = true, options } = {}) => ({
 optimization: {
   minimizer: [
     new TerserWebpackPlugin({
       parallel: true,
       sourceMap,
       terserOptions: options,
     }),
   ],
 },
});

exports.minifyCSS = ({ options } = {}) => ({
 plugins: [
   new OptimizeCssAssetsWebpackPlugin({
     cssProcessor: cssnano,
     cssProcessorOptions: options,
     canPrint: false,
   }),
 ],
});

exports.generateSourceMaps = ({ type } = {}) => ({
 devtool: type,
});

exports.loadJavaScript = ({ include, exclude, use = [] } = {}) => ({
 module: {
   rules: [
     {
       test: /\.jsx?$/,
       include,
       exclude,
       use: [].concat(use),
     },
   ],
 },
});