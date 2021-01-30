const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const config = {
  entry: ['./src/index.js', './src/index.html'],
  output: {
    filename: 'index.[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html', filename: './index.html' })],
  mode: 'development',
  devtool: 'eval-cheap-source-map', 
  devServer: {
    port: 8000,
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              { useBuiltIns: 'usage', corejs: 3, targets: 'defaults' },
            ],
          ],
        },
      },
    ],
  },
}

if (currentTask == 'build') {
  config.mode = 'production'
  config.module.rules[0].use[0] = MiniCssExtractPlugin.loader
  config.plugins.push(
    new MiniCssExtractPlugin({ filename: 'main.[fullhash].css' }),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin()
  )
}

module.exports = config
