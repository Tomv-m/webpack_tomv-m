const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const finalPath = path.resolve(__dirname, 'dist')

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    path: finalPath
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 2002
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
          'css-loader',
          'sass-loader'
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
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader',
          'glslify-loader'
        ]
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