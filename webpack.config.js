import { dirname, join, resolve } from 'node:path'
import { fileURLToPath  } from 'node:url'

import CopyWebpackPlugin from 'copy-webpack-plugin'
import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const _dirName = dirname(fileURLToPath(import.meta.url))

export default {
  mode: process.env.NODE_ENV,
  /**
   * entry: {
   *   app: [
   *       resolve(_dirName, 'src/index.ts')
   *   ],
   * },
   * entry: {
   *   app: './src/app.ts',
   *   index: './src/index.ts',
   * },
   */
  entry: './src/index.ts',
  output: {
    path: resolve(_dirName, 'dist'),
    filename: '[name].[contenthash].js',
    // environment: {
    //   arrowFunction: false,
    // },
    clean: true,
    pathinfo: false,
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    // cache: { type: 'memory' },
    static: resolve(_dirName, 'public'),
    // compress: true,
    // open: true,
    hot: true,
    port: 9000, // 默认 8080
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        // test: /\.tsx?$/,
        include: resolve(_dirName, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      chrome: '108',
                      // ie: '11',
                    },
                    corejs: '3',
                    useBuiltIns: 'usage',
                  },
                ]
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/i,
        include: resolve(_dirName, 'src'),
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions',
                    },
                  ],
                ],
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // {
      //   test: /\.(csv|tsv)$/i,
      //   use: ['csv-loader'],
      // },
      // {
      //   test: /\.xml$/i,
      //   use: ['xml-loader'],
      // },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: resolve(_dirName, 'public'),
        to: resolve(_dirName, 'dist')
      }],
    }),
    // 参考 ts-loader 的 transpileOnly 配置
    new ForkTsCheckerWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false,
    }),
    new HtmlWebpackPlugin({
      // favicon: './public/favicon.png',
      // filename: 'index.html',
      inject: true,
      // title: '这是一个自定义的 title',
      template: join(_dirName, './src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
}
