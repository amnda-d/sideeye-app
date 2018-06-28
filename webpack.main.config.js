const path = require('path');
const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyWebPackPlugin([
      path.resolve(__dirname, 'src/apidist'),
    ]),
  ],
};
