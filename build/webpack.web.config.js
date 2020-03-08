var path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, '../src/pages/index/web.app.ts')
  },
  output: {
    path: path.resolve(__dirname, '../webDist'),
    publicPath: './',
    filename: '[name]/[name].[hash:8].js'
  },
  target: 'web',
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
                        loaders: [
                            { 
                                css: "vue-style-loader!css-loader" // <style lang="css">
                            }
                        ]
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
                'style-loader', 
                'css-loader',
            ]
        },
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".css", ".scss", ".jpg", ".png", ".gif", ".jpeg"],
    alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": path.join(__dirname, "./src/")
    }
  },
  plugins: [
    new webpack.DefinePlugin({
        'IsMiniProgram': false, // 注入环境变量，用于业务代码判断
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: path.join(__dirname, '../index.html')
    }),
  ],
}