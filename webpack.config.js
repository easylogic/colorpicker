const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const dotenv = require('dotenv');

// set dotenv
dotenv.config();

const config = (env, options) => {
  const dev = options.mode === 'development';

  // base
  let out = {
    name: 'EasyLogicColorPicker',
    mode: dev ? 'development' : 'production',
    resolve: {
      extensions: [ '.js' ],
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          loader: 'file-loader',
          options: {
            publicPath: './',
            name: '[name].[ext]',
            limit: 10000,
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name].css' }),
    ],
  };

  /**
   * Development
   */
  if (dev) {
    out.entry = {
      app: './public/index.js',
    };
    out.output = {
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].js',
    };
    out.devtool = 'inline-source-map';
    out.devServer = {
      hot: true,
      host: '0.0.0.0',
      port: process.env.PORT ? Number(process.env.PORT) : (options.port || 3000),
      stats: 'minimal',
      historyApiFallback: true,
      noInfo: process.env.SHOW_INFO !== 'true',
      open: process.env.OPEN_BROWSER === 'true',
    };
    out.module.rules.push({
      test: /\.html$/,
      use: [
        {
          loader: "html-loader",
          options: { minimize: false }
        }
      ]
    });
    out.plugins.push(
      new HtmlWebpackPlugin({ template: './public/index.html' })
    );
  }

  /**
   * Production
   */
  if (!dev) {
    out.entry = {
      'EasyLogicColorPicker': './src/index.js',
    };
    out.output = {
      path: __dirname + '/dist',
      filename: '[name].js',
      publicPath: './',
      library: '[name]',
      libraryTarget: 'umd',
      libraryExport: 'default'
    };
    out.externals = {
      "@easylogic/color": {
        'commonjs': '@easylogic/color',
        'commonjs2': '@easylogic/color',
        'amd': '@easylogic/color',
        'root': ['Color']
      }
    }
    out.optimization = {
      minimize: true,
      minimizer: [
        new TerserJSPlugin({
          minify: (file, sourceMap) => {
            const uglifyJsOptions = {};
            if (sourceMap) {
              uglifyJsOptions.sourceMap = { content: sourceMap };
            }
            let str = require('uglify-js').minify(file, uglifyJsOptions);
            str.code = str.code.replace(/\s\s/gi, '');
            return str;
          },
        }),
        new CssMinimizerPlugin(),
      ],
    };
  }

  return out;
};

module.exports = config;
