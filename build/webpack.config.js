const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MpPlugin = require('mp-webpack-plugin') // 用于构建小程序代码的 webpack 插件，生成project.config.json和app.json
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageProcessPlugin = require("../plugins/ImageProcess")

const mpConfig = {
    // 页面 origin，默认是 https://miniprogram.default
    origin: 'https://miniprogram.default',
    // 入口页面路由，默认是 /
    entry: 'index',
    // 页面路由，用于页面间跳转
    router: {
        // 路由可以是多个值，支持动态路由
        index: [
            '/pages/index/',
        ],
        other: [
            '/pages/other/',
        ],
    },
    generate: {
        autoBuildNpm: 'npm',
        appEntry: 'miniprogram-app',
    },
    // 项目配置，会被合并到 project.config.json
    projectConfig: {
        appid:  'wx8949e93d46be3ec3',
        projectname: 'kbone-typescript',
    },
	app: {
		backgroundColor: '#F6F6F6',
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#F6F6F6',
		navigationBarTitleText: 'kbone测试开发',
		navigationBarTextStyle: 'black',
    },
    appExtraConfig: {
        requiredBackgroundModes: ["audio"]
    }
}

module.exports = {
    mode: 'production',
    entry: {
        'index': path.resolve(__dirname, '../src/pages/index/app.ts'),
        'other': path.resolve(__dirname, '../src/pages/other/app.ts'),
        'miniprogram-app': path.resolve(__dirname, '../src/main.ts'),
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
        splitChunks: { // 代码分隔配置，不建议修改
            chunks: 'all',
            minSize: 1000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 100,
            maxInitialRequests: 100,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'IsMiniProgram': true, // 注入环境变量，用于业务代码判断
        }),
        new VueLoaderPlugin(),
        new MpPlugin(mpConfig),
        new ImageProcessPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].wxss',
        }),
    ],
    resolve: {
        extensions: [".ts", ".js", ".vue", ".css", ".scss", ".jpg", ".png", ".gif", ".jpeg"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": path.join(__dirname, "./src/")
        }
    },
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
            //js
            {
                test: /\.js$/,
                use: 
                [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            },
            /* config.module.rule('images') */
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5300,
                            esModule: false,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'images/[name].[hash:8].[ext]',
									publicPath: "common"
                                }
                            }
                        }
                    }
                ]
            },
            /* config.module.rule('css') */
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },

        ]
    }
}