const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('postcss-hexrgba'),
  require('autoprefixer')
]

const cssConfig = {
  test: /\.(css|pcss|postcss)$/i,
  use: [
    {
      loader: 'css-loader',
      options: {
        url: false
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: postCSSPlugins
      }
    }
  ]
}

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', function() {
      fse.copySync('./app/assets/images', './docs/assets/images')
    })
  }
}

let config = {
  entry: './app/assets/scripts/index.js',
  module: {
    rules: [
      cssConfig,
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.html'
    })
  ]
}

if (currentTask === 'dev') {
  config.output = {
    path: path.resolve(__dirname, 'app'),
    filename: 'bundle.js'
  }
  config.devServer = {
    before: function(app, server) {
      server._watch('./app/**/*.html')
    },
    contentBase: path.join(__dirname, 'app'),
    hot: true,
    port: 3000,
    host: '0.0.0.0'
  }
  config.devtool = 'inline-source-map'
  config.mode = 'development'
  cssConfig.use.unshift('style-loader')
}

if (currentTask === 'build') {
  config.output = {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  }
  config.mode = 'production'
  config.optimization = {
    splitChunks: { chunks: 'all' }
  }
  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  })
  cssConfig.use.unshift(MiniCssExtractPlugin.loader)
  postCSSPlugins.push(require('cssnano'))
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[chunkhash].css'
    }),
    new RunAfterCompile()
  )
}

module.exports = config