/*
 * @file webpack config for develop
 * @author nighca <nighca@live.cn>
 */

var path = require('path');

module.exports = {
  cache: true,
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8088',
      './src/app'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.svg$/,
        loader: 'babel!svg-react'
      }
    ]
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    alias: {
      config: path.join(__dirname, 'config')
    }
  },
  plugins: [],
  devtool: 'eval'
};