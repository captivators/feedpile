const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.json$/,      //This is to load json as how we load js files using import. Refer Search.js
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.png$/,
        loader: "url-loader?mimetype=image/png"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    hot: true,
    port: 8081,
    proxy: {
      '*': 'http://127.0.0.1:' + (process.env.PORT || 8080)
    },
    host: '127.0.0.1'
  }
};
