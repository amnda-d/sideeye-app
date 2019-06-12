const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/flow',
            [
              '@babel/env',
              {
                targets: {
                  node: 'current',
                },
              },
            ],
            '@babel/react',
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    alias: {
      renderer: path.resolve(__dirname, 'src/renderer'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/renderer/index.html'),
    }),
  ],
};
