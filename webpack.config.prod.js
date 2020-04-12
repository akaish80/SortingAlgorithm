var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunksWebpackPlugin = require('extract-css-chunks-webpack-plugin');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const webpackMerge = require('webpack-merge');

const {
 loadJavaScript,
 generateSourceMaps,
 minifyJavaScript,
 minifyCSS
} = require('./webpack.parts');

const NODE_ENV = process.env.NODE_ENV || 'production';
const isProductionMode = NODE_ENV === 'production';

const cssFileName = isProductionMode
 ? 'styles/[name].[contenthash].bundle.css'
 : 'styles/[name].bundle.css';

const chunkFilename = isProductionMode
 ? 'build/styles/[name].[contenthash].bundle.css'
 : 'build/styles/[name].bundle.css';

const extractPlugin = new ExtractCssChunksWebpackPlugin({
 cssFileName,
 chunkFilename,
 orderWarning: false,
});

const projectDirectory = process.env.ROOT
 ? path.resolve(process.env.ROOT).replace(' ', '')
 : path.resolve(fs.realpathSync(process.cwd()));

const resolveProjectPath = (relativePath) => (
 path.join(projectDirectory, relativePath)
);

const sourcePath = resolveProjectPath('src');
const reportsPath = resolveProjectPath('reports');

const commonConfig = {
 name: 'CLIENT',
 target: 'web',
 entry: './src/index.js',
 output: {
  path: path.resolve(__dirname, 'build'),
  filename: isProductionMode
   ? 'scripts/[name].[contenthash].bundle.js'
   : 'scripts/[name].bundle.js',
  chunkFilename: isProductionMode
   ? 'scripts/[name].[contenthash].bundle.js'
   : 'scripts/[name].bundle.js',
 },
 module: {
  rules: [
   {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
     loader: "babel-loader"
    }
   }, 
   {
    test: /\.(html)$/,
    use: {
     loader: 'html-loader'
    }
   },
   {
    test: /\.(sa|sc|c)ss$/,
    use: [
     {
      loader: ExtractCssChunksWebpackPlugin.loader,
      options: {
       hot: !isProductionMode,
       modules: false,
       reloadAll: !isProductionMode,
      },
     },
     {
      loader: 'css-loader',
      options: {
       importLoaders: 3,
       sourceMap: true,
       import: true,
       modules: false,
       url: true,
      },
     },
     {
      loader: 'postcss-loader',
      options: {
       ident: 'postcss',
       sourceMap: true,
       plugins: [
        autoprefixer(),
       ],
      },
     },
     {
      loader: 'resolve-url-loader',
      options: {
       sourceMap: true,
      },
     }, {
      loader: 'sass-loader',
      options: {
       sourceMap: true,
       sassOptions: {
        includePaths: [resolveProjectPath('node_modules'), path.join(sourcePath, 'components')]
       }
      }
     },
    ]
   },
  ],
 },
 devServer: {
  contentBase: path.join(__dirname, 'build'),
  compress: true,
  port: 9000
 },
 plugins: [
  new HtmlWebpackPlugin(
   {
    template: './src/index.html'
   }
  ),
  extractPlugin
 ],
};

const optimization = {
 optimization: {
  moduleIds: 'hashed',
  removeEmptyChunks: true,
  runtimeChunk: 'single',
  splitChunks: {
   chunks: 'all',
   automaticNameDelimiter: '.',
   maxInitialRequests: Infinity,
   maxAsyncRequests: Infinity,
   minSize: 0,
   cacheGroups: {
    vendor: {
     name: 'vendor',
     enforce: true,
     test: /[\\/]node_modules[\\/](lodash|react|react-dom|jquery|core-js|parse5)[\\/]/,
     chunks: 'all',
     reuseExistingChunk: true,
    },
    commons: {
     name: 'commons',
     chunks: 'all',
     minChunks: 5,
    },
    default: false,
    vendors: false,
   },
  },
 },
};


const developmentConfig = webpackMerge([
 generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
 loadJavaScript({
  exclude: /(node_modules)/,
  use: ['babel-loader'],
 }),
 minifyJavaScript({
  sourceMap: true,
  options: {
   compress: {
    drop_console: false,
   },
   warnings: false,
  },
 }),
 minifyCSS({
  options: {
   autoprefixer: false,
   svgo: false,
   safe: true,
  },
 }),
 optimization
]);

const productionConfig = webpackMerge([
 generateSourceMaps({ type: 'source-map' }),
 loadJavaScript({
  exclude: /(node_modules)/,
  use: ['babel-loader'],
 }),
 minifyJavaScript({
  sourceMap: true,
  options: {
   compress: {
    drop_console: false,
   },
   warnings: false,
  },
 }),
 minifyCSS({
  options: {
   autoprefixer: false,
   svgo: false,
   safe: true,
  },
 }),
 optimization
]);

const baseConfig = (mode) => {
 if (mode === 'production') {
  return webpackMerge(commonConfig, productionConfig, { mode });
 }

 return webpackMerge(commonConfig, developmentConfig, { mode });
};

module.exports = baseConfig(isProductionMode ? 'production' : 'development');
