
const path = require("path");
const resolve = dir => path.join(__dirname, dir);

module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            "^/beeapi": {
              target: "http://localhost:3000",
              ws: true, //代理websockets
              changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求							的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
              pathRewrite: {  //重写匹配的字段，如果不需要在请求路径上，重写为""
                  "^/beeapi": ""
              }
      
            }
        }
    },

    chainWebpack: config => {
        config.resolve.alias.set("@", resolve("src"));
        config.when(process.env.NODE_ENV === 'production', config => {
            /* 设置打包入口 */
            config.entry('app').clear().add('./src/main-prod.js')

            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                vuex: 'Vuex',
                /* 'js-md5': 'md5' */
            })

            config.plugin('html').tap(args => {
                //添加参数isProd
                args[0].isProd = true
                return args
            })
        })
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main.js')
            config.plugin('html').tap(args => {
                //添加参数isProd
                args[0].isProd = false
                return args
            })
        })
    },

    productionSourceMap: false
}