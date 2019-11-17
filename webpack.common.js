const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const finalPath = path.resolve(__dirname, 'dist')

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: finalPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img',
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: './public', to: finalPath, force: true },
      { from: './src/img', to: path.join(finalPath, '/img'), force: true },
    ]),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    })
  ]
}