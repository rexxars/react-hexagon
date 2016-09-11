const path = require('path')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV !== 'production' // eslint-disable-line no-process-env

module.exports = {
  devtool: isDev && '#cheap-module-eval-source-map',
  entry: isDev ? ['webpack-hot-middleware/client', './demo/demo'] : './demo/demo',
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'demo')
      ]
    }]
  }
}
