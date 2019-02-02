const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['babel-regenerator-runtime', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      '@actions': path.resolve(__dirname, 'src/actions'),
      '@selectors': path.resolve(__dirname, 'src/selectors'),
      '@styles': path.resolve(__dirname, 'src/styles')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    publicPath: '/dist',
    proxy: [{
      context: ['/auth/*', '/api/*'],
      target: 'http://localhost:5000',
    }]
  }
}