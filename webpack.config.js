var path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [
          path.resolve(__dirname, "/node_modules/")
        ],
        loader: "babel-loader",
        options: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
    ]
  }
};
