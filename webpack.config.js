const webpack = require('webpack');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: __dirname,
    filename: './client/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    contentBase: './client'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'react-hmre']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules)/
      }]
  },
};

