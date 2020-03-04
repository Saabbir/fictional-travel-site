const path = require('path')

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-hexrgba'),
  require('autoprefixer')
]

module.exports = {
  entry: './app/assets/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'bundle.js'
  },
  devServer: {
    before: function(app, server) {
      server._watch('./app/**/*.html')
    },
    contentBase: path.join(__dirname, 'app'),
    hot: true,
    port: 3000,
    host: '0.0.0.0'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(css|pcss|postcss)$/i,
        use: [
          'style-loader', 
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: postCSSPlugins
            }
          }
        ]
      }
    ]
  }
}