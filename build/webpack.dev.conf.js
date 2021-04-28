/*
'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// 合并base和dev
//const devWebpackConfig = merge(baseWebpackConfig, {
const devWebpackConfig = merge.merge(baseWebpackConfig, {
  //配置CSS
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  //配置是否开启sorcemap
  //devtool就是开发者工具（检查）
  devtool: false,
 /!* devtool: config.dev.devtool,*!/

  // these devServer options should be customized in /config/index.js
  //webpack本身是打包的 wepack(webpackconfig) 就是打包，但是react-script除了打包还能启动、还有热更新
  //但是wepack是一次性的，只是打包，所以我们得安装webpack-dev-server，他帮我们去启动了一个服务器
  //这个服务器也是用的express框架，支持热更新（像nodemon）
  //这个devserver服务器
  //就是dev-tools network ws【web-socket】里面有个长连接，只要一修改内容，ws内容就会变


  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*!/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    //热更新
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    //监听的地址
    host: 'localhost',
    port: 8080,
    //浏览器打开host+port
    open: true,
    //浏览器页面上的报错，设置false就是页面不会提示错误
    /!*overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,*!/
    //打包就是把打包出来的bunder.js插入到html里面 让这个JS生效（他前面的路径是什么）
    //这个就是配置bundle.js的路径
    //就是配置这个绝对路径的地址
    //如果配置/就是代表当前域名，localhost:8080
    //如果之后要跑到线上，你在写个/，但是资源是上传到某个服务器域名上的
    //我们再用默认的localhost肯定访问不到，这个就是用来指定这个域名的
    publicPath: config.dev.assetsPublicPath,
    //代理
    //localhost:8080访问localhost:3000跨域，这个是浏览器规定的跨域
    //如果这个请求不是浏览器发起的，如果从本地服务器发起，其实就不会跨域，两个server互发消息（就不会跨域）
    //这里使用node 服务器代理
    //如果配置'/api':'http:www.baidu.com'
    //axios.get('/api',params,heeader)
    //这个时候如果配置这个proxy，那么就会将/api全都转发到http:www.baidu.com
    //就是：localhost:8080/api ---> http:www.baidu.com/api,实现代理
    //正向代理是代理客户端，反向代理是代理服务器
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    //热更新就是监听本地的文件变化
    //这个就是配置用什么方法去监听
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        'NODE_ENV':'dev',
      })
    }),
    new webpack.HotModuleReplacementPlugin(),
   /!* new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.*!/
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    }),
    // copy custom static assets
      //根目录下static下面的东西挪动到bulid的static下
  /!*  new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../build/static'),
        ignore: ['.*']
      }
    ])*!/
    new CopyWebpackPlugin({
      patterns: [
        { from:path.resolve(__dirname, '../static'),
          to: path.resolve(__dirname, '../build/static'), }
      ],
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        //utils里面要安装node-notifier
        /!*onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined*!/
      }))

      resolve(devWebpackConfig)
    }
  })
})
*/


'use strict'
// const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// 合并base和dev
//const devWebpackConfig = merge(baseWebpackConfig, {
const devWebpackConfig = merge.merge(baseWebpackConfig, {
  mode: 'development',
  //配置CSS
  // module: {
  //   rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  // },
  // cheap-module-eval-source-map is faster for development
  //配置是否开启sorcemap
  //devtool就是开发者工具（检查）
  devtool: false,
  /* devtool: config.dev.devtool,*/

  // these devServer options should be customized in /config/index.js
  //webpack本身是打包的 wepack(webpackconfig) 就是打包，但是react-script除了打包还能启动、还有热更新
  //但是wepack是一次性的，只是打包，所以我们得安装webpack-dev-server，他帮我们去启动了一个服务器
  //这个服务器也是用的express框架，支持热更新（像nodemon）
  //这个devserver服务器
  //就是dev-tools network ws【web-socket】里面有个长连接，只要一修改内容，ws内容就会变


  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    //热更新
    hot: true,
    contentBase: 'public', // 之前是 false
    compress: true,
    //监听的地址
    host: 'localhost',
    port: 3000,
    //浏览器打开host+port
    open: true,
    //浏览器页面上的报错，设置false就是页面不会提示错误
    /*overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,*/
    //打包就是把打包出来的bunder.js插入到html里面 让这个JS生效（他前面的路径是什么）
    //这个就是配置bundle.js的路径
    //就是配置这个绝对路径的地址
    //如果配置/就是代表当前域名，localhost:8080
    //如果之后要跑到线上，你在写个/，但是资源是上传到某个服务器域名上的
    //我们再用默认的localhost肯定访问不到，这个就是用来指定这个域名的
    publicPath: config.dev.assetsPublicPath,
    //代理
    //localhost:8080访问localhost:3000跨域，这个是浏览器规定的跨域
    //如果这个请求不是浏览器发起的，如果从本地服务器发起，其实就不会跨域，两个server互发消息（就不会跨域）
    //这里使用node 服务器代理
    //如果配置'/api':'http:www.baidu.com'
    //axios.get('/api',params,heeader)
    //这个时候如果配置这个proxy，那么就会将/api全都转发到http:www.baidu.com
    //就是：localhost:8080/api ---> http:www.baidu.com/api,实现代理
    //正向代理是代理客户端，反向代理是代理服务器
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    //热更新就是监听本地的文件变化
    //这个就是配置用什么方法去监听
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        'NODE_ENV':'dev',
      })
    }),
    new webpack.HotModuleReplacementPlugin(),
    /* new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.*/
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    }),
    // copy custom static assets
    //根目录下static下面的东西挪动到bulid的static下
    /*  new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../static'),
          to: path.resolve(__dirname, '../build/static'),
          ignore: ['.*']
        }
      ])*/
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from:path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist')
      }],
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        //utils里面要安装node-notifier
        /*onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined*/
      }))

      resolve(devWebpackConfig)
    }
  })
})
