const {
  AutoCreateVueRouteWebpackPlugin,
} = require('vue-auto-create-route/build/plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const appName = process.env.VUE_APP_NAME
const publicPath =
  process.env.VUE_APP_ENV === 'production' ? `/${appName}/` : ''
const subAppList = require('./src/micro/app')
let proxyObjs = {}

subAppList.map((item) => {
  const proxyObj = {
    [`/${item.APP_NAME}/_baseAPI`]: {
      target: item.API_ADDRESS,
      changeOrigin: true,
      pathRewrite: {
        [`^/${item.APP_NAME}/_baseAPI`]: '',
      },
    },
    [`/${item.APP_NAME}`]: {
      target: item.FE_ADDRESS,
      secure: false,
      bypass(req) {
        if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
          return '/portal/index.html'
        }
      },
      pathRewrite: {
        [`^/${item.APP_NAME}`]: '',
      },
    },
  }
  proxyObjs = { ...proxyObjs, ...proxyObj }
})

module.exports = {
  productionSourceMap: false,
  publicPath,
  devServer: {
    compress: true,
    // host: 'portal.fe.com',
    port: 8082,
    hotOnly: false,
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      ...proxyObjs,
    },
  },
  configureWebpack: {
    output: {
      libraryTarget: 'umd',
      library: appName,
      jsonpFunction: `webpackJsonp_${appName}`,
    },
    plugins: [
      new AutoCreateVueRouteWebpackPlugin( // 自动化路由
        { cwd: __dirname, hideConsole: true },
        null,
        true
      ),
    ],
  },
}
