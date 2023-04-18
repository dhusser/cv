module.exports = {
  // mode: isDev ? 'development' : 'production',
  mode: 'production',
  // devtool: isDev ? 'eval-source-map' : 'none',
  // devtool: 'eval-source-map',
  output: {
    filename: 'main.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
}