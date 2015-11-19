var path = require('path');

module.exports = {
  cache: true,
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
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
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  },
  resolve: {
    root: path.join(__dirname, 'src')
  },
  plugins: []
};