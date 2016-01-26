var webpack = require('webpack');

module.exports = {
  entry: "./app/main.js",
  output: {
    path: "/built",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.(es6|js)$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        query: {
          extensions: ['.hbs'],
          debug: true
        }
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $ : "jquery",
      Backbone : "backbone",
      _ : "underscore"
    })
  ]
}