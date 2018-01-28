const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'client/src'),
  build: path.join(__dirname, 'production'),
  styles: path.join(__dirname, 'client/src/build/assets/css')
};
const common = {
  context: PATHS.app,
  entry: {
    app: './index.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      // Compression specific options
      compress: {
        // remove warnings
        warnings: false,
        // Drop console statements
        drop_console: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_HOST: JSON.stringify('https://zachang-hellobooks.herokuapp.com')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.EnvironmentPlugin({
      CLIENT_ID: JSON.stringify(process.env.CLIENT_ID)
    })
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: PATHS.app
      },
      {
        test: /\.(scss|css)?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
        })
      },
      {
        test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=250000'
      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  }
};
module.exports = common;

