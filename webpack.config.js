const path = require('path');
const webpack = require('webpack');
const packageInfo = require('./package.json');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const version = packageInfo.version;

module.exports = {
    target: 'web',
    entry: path.resolve(__dirname,  'src/index'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'JFE.js',
        library: 'JFE',
        libraryTarget: 'umd'
    },
    node: {
        'fs': 'empty',
        'path': 'empty',
        'process': false
    },
    resolve: {
        alias: {}
    },
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.BannerPlugin(`JFE.js@${version} for browser | https://github.com/ws880321/JFE.git`),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CleanWebpackPlugin(
            ['dist/*.*'],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        ),
        process.env.NODE_ENV === 'production' ? new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: false
            },
            mangle: {
                screw_ie8: false
            },
            output: {
                screw_ie8: false
            }
        }) : () => {}
    ]
};