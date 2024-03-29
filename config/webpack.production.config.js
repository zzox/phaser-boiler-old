const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path')
const join = (dir) => path.join(__dirname, dir)
const nodeModules = join('../node_modules/')
const build = join('../build')

const definePlugin = new webpack.DefinePlugin({
  WEBGL_RENDERER: true,
  CANVAS_RENDERER: true,
  'typeof SHADER_REQUIRE': JSON.stringify(false),
  'typeof CANVAS_RENDERER': JSON.stringify(true),
  'typeof WEBGL_RENDERER': JSON.stringify(true),
  'process.env.NODE_ENV': JSON.stringify('production')
})

const htmlPlugin = new HtmlWebpackPlugin({
  template: './index.html'
})

const minimizePlugin = new UglifyJsPlugin({
  parallel: true,
  extractComments: true
})

const copyPlugin = new CopyWebpackPlugin([
  { from: 'assets', to: 'assets' }
])

module.exports = (env, options) => ({
  mode: 'production',
  output: {
    path: build,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: './'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [definePlugin, htmlPlugin, minimizePlugin, copyPlugin],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [nodeModules],
        use: {
          loader: 'babel-loader?cacheDirectory'
        }
      },
      {
        test: /\.(png|jpg|gif|ico|svg|pvr|pkm|static|m4a|ac3|ogg|mp3|wav)$/,
        exclude: [nodeModules],
        use: ['file-loader']
      },
      {
        test: [/\.vert$/, /\.frag$/],
        exclude: [nodeModules],
        use: 'raw-loader'
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
})
