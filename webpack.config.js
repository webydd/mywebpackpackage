const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({ minimize: true });//代码压缩
const CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common');//把公共模块提取出来, 并取名为'common'(名字自起), webpack之后再out文件夹下生成common.js, 测试时记得引入提取出来的公共模块js文件
const providePlugin = new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' });//引入jquery
const OpenBrowserPlugin = require('open-browser-webpack-plugin');/*自动打开浏览器*/

const config = {
    entry: {
        index: './src/index.js',
        // app:'./src/app.js'
    },/*入口文件*/
    output: {
        filename: '[name].js',//输出文件名
        publicPath: '/build',//添加静态资源, 否则会出现路径错误
        path: path.resolve(__dirname + '/build')
    },
    module: {
        rules: [
            {
                test: /.js(|x)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },/*转义js文件*/
            // {
            //      test:/.css$/,
            //      use:['style-loader','css-loader']
            // },/*解析css,并把css添加到html的style标签里*/
            {
                test: /.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },/*解析Css,并把css转成文件通过link标签引入*/
            {
                test: /.(jpg|png|gif|svg)$/,
                use: ['url-loader?limit=8192&name=./[name].[ext]']
            },/*解析图片*/
            {
                test: /.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }/*解析less,并把less解析成浏览器可以识别的css语言*/
        ]
    },
    plugins: [
        uglifyPlugin,
        CommonsChunkPlugin,
        providePlugin,
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url:'http://localhost:8000'
        })
    ],
    devServer: {
        port:8000,
        contentBase: path.join(__dirname, "/build"),
        compress: true,
        historyApiFallback: true,
        inline: true, //注意：不要写colors:true，progress:true等，webpack2.x已不支持这些
        progress:true
    }

};

module.exports = config;