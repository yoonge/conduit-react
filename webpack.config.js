import { dirname, resolve } from 'node:path'
import { fileURLToPath  } from 'node:url'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const _dirName = dirname(fileURLToPath(import.meta.url))

export default {
  // mode production
  mode: 'development',

  // entry: {
  //   app: [
  //       resolve(_dirName, 'src/index.ts')
  //   ],
  // },
  // entry 指定入口文件
  entry: './src/index.ts',

  // output 打包后的文件存放的相关配置
  output: {
    // path 指定打包后文件的存放目录
    path: resolve(_dirName, 'dist'),
    // filename 指定打包后文件的文件名
    filename: 'bundle.js',
    // environment 告诉 webpack 不使用哪些语法
    // environment: {
    //   arrowFunction: false,
    // },
  },

  // module 指定 webpack 打包时要使用的模块
  module: {
    // rules 指定要加载的规则
    rules: [
      {
        // test 指定规则生效的文件，正则
        test: /\.ts$/,
        // use 要使用的 loader，loader 从后往前执行
        use: [
          // 配置 babel
          {
            // loader 指定加载器
            loader: 'babel-loader',
            options: {
              // presets 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    // 要兼容的目标浏览器及版本
                    targets: {
                      chrome: '108',
                      // ie: '11',
                    },
                    // 指定 corejs 的版本
                    corejs: '3',
                    // 指定使用 corejs 的方式，usage 表示按需加载
                    useBuiltIns: 'usage',
                  },
                ]
              ],
            },
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
      // less 相关配置
      {
        test: /\.less$/,
        use: [
          'style-loader',
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
    ],
  },

  // 配置 webpack 插件
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // title 指定生成的 html 的 title
      // title: '这是一个自定义的 title',
      // template 自定义用来生成 html 的模板
      template: './src/index.html',
    }),
  ],

  // 设置哪些文件可以作为模块被引用
  resolve: {
    extensions: ['.ts', '.js'],
  },
}
