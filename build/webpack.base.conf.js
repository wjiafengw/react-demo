/*
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')

/!*const vueLoaderConfig = require('./vue-loader.conf')*!/

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

/!*const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})*!/

module.exports = {

    context: path.resolve(__dirname, '../'),
    //打包的入口文件
    entry: {
        app: './src/index.js'
    },
    output: {
        //输出路径
        path: path.join(__dirname, '/static'),
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? '/'
            : '/'
    },
    resolve: {
        //默认引文件时不加后缀，他会认为是这些后缀
        extensions: ['.js', /!*'.vue',*!/ '.json'],
        //@的用法 : /../../ 这种是相对路径 ，@:resole('src') resolve是当前根目录下的某一个路径， resolove(‘src’)就是根目录下的src文件夹
        //为什么要用join而不是直接字符串相加?
        //dirname 是当前节点父亲路径绝对值
        alias: {
        /!*    'vue$': 'vue/dist/vue.esm.js',*!/
            '@': resolve('src'),
        }
    },
    //以前叫use,用来配置和识别模块
    //任何文件都是一个模块
    //loaders：本身是一个function,以vue-loader为例，
    //如何让.vue变成浏览器可以运行的？因为只有js css html才是被认可的
    //就是通过vue-loader
    //匹配所有.vue结尾的，都会通过vue-loader （把.vue文件都送到vue-loader）
    //会从package.json去找vue-loader,如果没安装就会报错
    //vue-loader 接受content(template....)--> 解析(正则匹配template等vue的标签,拿到template内容了（里面是DOM）；
    // 同理解析script，生成对应js,并且import进来;解析【所有】style标签)---->返回新的content(浏览器认识的)（.js文件）
  //这个过程就变成了：一个js文件了 template变成了import vue from 'vue'
  //script 变成  const instance = new Vue({})实例 instance.render(解析的template)


  //那么有react-loader吗？
  //事实上react也都是.js结尾的
  //那么他会先过Babel,写一个.babelrc 然后把preset-react引进来
    module: {
        rules: [
          /!*  ...(config.dev.useEslint ? [createLintingRule()] : []),*!/
            /!* {
               test: /\.vue$/,
               loader: 'vue-loader',
               options: vueLoaderConfig
             },*!/

            //.js过babel 让es6转es5
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            //静态图片过url-loader,将图片等二进制文件转化成url地址
            //<img :src='url'>
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            //字体文件
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
  //不需要关心
  //打包时是否能用node的API，可以不配置
   /!* node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }*!/
}
*/
'use strict'
const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/*const vueLoaderConfig = require('./vue-loader.conf')*/

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

/*const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})*/

module.exports = {

    context: path.resolve(__dirname, '../'),
    //打包的入口文件
    entry: {
        bundle: './src/index.js'
    },
    output: {
        //输出路径
        path: path.join(__dirname, '/static'),
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? '/'
            : '/'
    },
    resolve: {
        //默认引文件时不加后缀，他会认为是这些后缀
        extensions: ['.js', /*'.vue',*/ '.json'],
        //@的用法 : /../../ 这种是相对路径 ，@:resole('src') resolve是当前根目录下的某一个路径， resolove(‘src’)就是根目录下的src文件夹
        //为什么要用join而不是直接字符串相加?
        //dirname 是当前节点父亲路径绝对值
        alias: {
            /*    'vue$': 'vue/dist/vue.esm.js',*/
            '@': resolve('src'),
        }
    },
    //以前叫use,用来配置和识别模块
    //任何文件都是一个模块
    //loaders：本身是一个function,以vue-loader为例，
    //如何让.vue变成浏览器可以运行的？因为只有js css html才是被认可的
    //就是通过vue-loader
    //匹配所有.vue结尾的，都会通过vue-loader （把.vue文件都送到vue-loader）
    //会从package.json去找vue-loader,如果没安装就会报错
    //vue-loader 接受content(template....)--> 解析(正则匹配template等vue的标签,拿到template内容了（里面是DOM）；
    // 同理解析script，生成对应js,并且import进来;解析【所有】style标签)---->返回新的content(浏览器认识的)（.js文件）
    //这个过程就变成了：一个js文件了 template变成了import vue from 'vue'
    //script 变成  const instance = new Vue({})实例 instance.render(解析的template)


    //那么有react-loader吗？
    //事实上react也都是.js结尾的
    //那么他会先过Babel,写一个.babelrc 然后把preset-react引进来
    module: {
        rules: [
            /*  ...(config.dev.useEslint ? [createLintingRule()] : []),*/

            //.js过babel 让es6转es5
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            //静态图片过url-loader,将图片等二进制文件转化成url地址
            // //<img :src='url'>
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 20000,
                    name: path.join(path.resolve(__dirname, '../dist'), 'static', 'img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.join(config.build.assetsRoot, config.build.assetsSubDirectory, 'media/[name].[hash:7].[ext]')
                }
            },
            //字体文件
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.join(config.build.assetsRoot, config.build.assetsSubDirectory, 'fonts/[name].[hash:7].[ext]')
                }
            },
        ]
    },
    //不需要关心
    //打包时是否能用node的API，可以不配置
    /* node: {
         // prevent webpack from injecting useless setImmediate polyfill because Vue
         // source contains it (although only uses it if it's native).
         setImmediate: false,
         // prevent webpack from injecting mocks to Node native modules
         // that does not make sense for the client
         dgram: 'empty',
         fs: 'empty',
         net: 'empty',
         tls: 'empty',
         child_process: 'empty'
     }*/
}
