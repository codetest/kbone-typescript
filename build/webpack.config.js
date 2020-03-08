const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MpPlugin = require('mp-webpack-plugin') // 用于构建小程序代码的 webpack 插件，生成project.config.json和app.json

const mpConfig = {
    // 页面 origin，默认是 https://miniprogram.default
    origin: 'https://miniprogram.default',
    // 入口页面路由，默认是 /
    entry: 'index',
    // 页面路由，用于页面间跳转
    router: {
        // 路由可以是多个值，支持动态路由
        index: [
            '/test/index',
        ]
    },
    generate: {
        autoBuildNpm: true, // 安装小程序render和element这两个依赖
    },
    // 项目配置，会被合并到 project.config.json
    projectConfig: {
        appid: 'wx8949e93d46be3ec3', // 测试小程序账号
        projectname: 'kbone-demo',
    },
}

module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, '../src/pages/index/app.ts'),
    },
    output: {
        path: path.resolve(__dirname, '../dist/common'), // 放到小程序代码目录中的 common 目录下
        filename: '[name].js', // 必需字段，不能修改
        library: 'createApp', // 必需字段，不能修改
        libraryExport: 'default', // 必需字段，不能修改
        libraryTarget: 'window', // 必需字段，不能修改
    },
    target: 'web', // 必需字段，不能修改
    optimization: {
        runtimeChunk: false, // 必需字段，不能修改
    },
    plugins: [
        new VueLoaderPlugin(),
        new MpPlugin(mpConfig)
    ],
    module: {
        rules: [
            // vue
            {
                test: /\.vue$/,
                use: [ 
                    {
                        loader: 'vue-loader',
                        options: {
                            preserveWhitespace: false,
                        }
                    }
                ],
            },
            // ts
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: 
                        {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            },

        ]
    }  
}