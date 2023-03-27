import { dirname, resolve } from 'node:path'
import { fileURLToPath  } from 'node:url'

import HtmlWebpackPlugin from 'html-webpack-plugin'

const _dirName = dirname(fileURLToPath(import.meta.url))

export default {
  mode: 'development',
  entry: {
    app: [
        resolve(_dirName, 'src/index.ts')
    ]
  },
  output: {
    path: resolve(_dirName, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ]
}
