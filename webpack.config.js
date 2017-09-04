const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: __dirname,
    filename: './client/src/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        query: {
          presets: ['react', 'es2015', 'react-hmre']
        },
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'client/src')
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: path.join(__dirname, 'client/src')
      },
      {
        test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        include: path.join(__dirname, 'client/src')
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=250000',
        include: path.join(__dirname, 'client/src')
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    host: process.env.HOST,
    port: process.env.PORT,
    proxy: {
      '/api/v1/**': {
        target: 'http://localhost:8000',
        secure: false
      }
    },
    contentBase: path.resolve(__dirname, "./client/src")
  },
  externals: {
    jquery: 'jQuery'
  }
};
