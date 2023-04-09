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
   * entry: './src/index.ts',
   * @entry 指定入口文件
   */
  entry: {
    app: './src/app.ts',
    index: './src/index.ts',
  },

  /**
   * @output 打包后的文件存放的相关配置
   */
  output: {
    /**
     * @path 指定打包后文件的存放目录
     */
    path: resolve(_dirName, 'dist'),
    /**
     * @filename 指定打包后文件的文件名
     */
    filename: '[name].[contenthash].js',
    /**
     * @environment 告诉 webpack 打包后的文件中不使用哪些语法，例如箭头函数
     */
    // environment: {
    //   arrowFunction: false,
    // },
    /**
     * @clean 打包前是否清空 output 指定的目录
     */
    clean: true,
    /**
     * @pathinfo Webpack 会在输出的 bundle 中生成路径信息；然而，在打包数千个模块的项目中，这会造成垃圾回收性能压力
     */
    pathinfo: false,
  },

  /**
   * @devtool 大多数情况下，最佳选择
   */
  devtool: 'eval-cheap-module-source-map',

  devServer: {
    /**
     * @cache 缓存生成的 webpack 模块和 chunk，来改善构建速度
     * cache 会在 开发模式 被设置成 type: 'memory' 而且在 生产模式 中被禁用
     * cache: true 与 cache: { type: 'memory' } 作用一致
     */
    cache: { type: 'memory' },
    /**
     * @static 配置静态资源文件目录
     */
    static: resolve(_dirName, 'public'),
    /**
     * @compress 是否压缩
     */
    // compress: true,
    /**
     * @open 是否自动打开默认浏览器
     */
    // open: true,
    /**
     * @hot 是否开启热更新
     */
    hot: true,
    /**
     * @port 服务端口
     */
    port: 9000, // 默认 8080
  },

  /**
   * @module 指定 webpack 打包时要使用的模块
   */
  module: {
    /**
     * @rules 指定要加载的规则
     */
    rules: [
      {
        /**
         * @test 指定规则生效的文件，正则
         */
        test: /\.ts$/i,
        // test: /\.tsx?$/, // 匹配 ts 和 tsx 文件
        /**
         * @include 指定规则生效的目录
         */
        include: resolve(_dirName, 'src'),
        /**
         * @use 要使用的 loader，loader 从后往前执行
         */
        use: [
          // 配置 babel
          {
            /**
             * @loader 指定加载器
             */
            loader: 'babel-loader',
            options: {
              /**
               * @presets 设置预定义的环境
               */
              presets: [
                [
                  // 指定环境的插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    /**
                     * @targets 要兼容的目标浏览器及版本
                     */
                    targets: {
                      chrome: '108',
                      // ie: '11',
                    },
                    /**
                     * @corejs 指定 corejs 的版本
                     */
                    corejs: '3',
                    /**
                     * @useBuiltIns 指定使用 corejs 的方式，usage 表示按需加载
                     */
                    useBuiltIns: 'usage',
                  },
                ]
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              /**
               * @transpileOnly 你可以为 loader 传入 transpileOnly 选项，以缩短使用 ts-loader 时的构建时间
               * 但使用此选项，会关闭类型检查
               * 如果要再次开启类型检查，请使用 ForkTsCheckerWebpackPlugin
               * 使用此插件会将检查过程移至单独的进程，可以加快 TypeScript 的类型检查和 ESLint 插入的速度
               * 使用此插件的例子：https://github.com/TypeStrong/ts-loader/tree/main/examples/fork-ts-checker-webpack-plugin
               */
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      // less 相关配置
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

  /**
   * @plugins 配置 webpack 插件
   */
  plugins: [
    // 仅用于生产环境将 public 目录下静态资源文件拷贝到 dist 目录
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
      /**
       * @favicon 添加指定的 favicon path 到输出的 html 文件中
       */
      // favicon: './public/favicon.png',
      /**
       * @filename 将生成的 html 写入到该文件中
       * 默认写入到 index.html 中
       * 也可以在这儿指定子目录，如：'assets/index.html'
       */
      // filename: 'index.html',
      /**
       * @inject 可选值 true | 'head' | 'body' | false
       *  添加所有的静态资源（assets）到模板文件或 templateContent
       *  true 或 'body' -- 所有 javascript 资源将被放置到 body 元素的底部
       *  'head' -- 所有的脚本将被放置到 head 元素中
       */
      inject: true,
      /**
       * @title 指定生成的 html 的 title
       */
      // title: '这是一个自定义的 title',
      /**
       * @template 自定义用来生成 html 的模板
       */
      template: join(_dirName, './src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],

  /**
   * @resolve 设置哪些文件可以作为模块被引用，引用的时候可省略文件后缀名
   */
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
