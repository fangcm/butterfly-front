require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
// public path overwrite
config.dev.assetsPublicPath = './'

var opn = require('opn')
var path = require('path')
var webpack = require('webpack')

var webpackConfig = require('./webpack.app.conf')

var compiler = webpack(webpackConfig)

require('webpack-dev-middleware-hard-disk')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})