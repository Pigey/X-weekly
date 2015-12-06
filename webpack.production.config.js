/*
 * @file webpack config for production
 * @author nighca <nighca@live.cn>
 */

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var assetsPath = './dist/';
var outputPath = path.join(__dirname, 'dist');

module.exports = {
  cache: true,
  entry: {
    app: './src/app'
  },
  output: {
    path: outputPath,
    publicPath: assetsPath,
    filename: '[name].[chunkhash].js',
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    // generate entry file
    function () {
      this.plugin('done', function (stats) {
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        stats = stats.toJson();

        fs.writeFileSync(
            path.join(outputPath, 'entry.js'),
            'window.insertScript(\'' + assetsPath + stats.assetsByChunkName.app + '\');'
        );
      });
    }
  ]
};