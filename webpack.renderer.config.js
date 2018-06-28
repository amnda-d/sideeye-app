// require('dotenv').config();
const path = require('path');
const CopyWebPackPlugin = require('copy-webpack-plugin');
// const Dotenv = require('dotenv-webpack');
// const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      // passes js files through a babel parser
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ]
  },
  // copies files to the compiled folder
  plugins: [
    new CopyWebPackPlugin([
      path.resolve(__dirname, 'src/renderer/index.html'),
    ]),
    // replaces env variables with the values
    //new Dotenv({ systemvars: true }),
    //new webpack.NormalModuleReplacementPlugin(/\.\/dlpwrapper.js/, './names.json'),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    alias: {
      renderer: path.resolve(__dirname, 'src/renderer'),
    },
  },
};
