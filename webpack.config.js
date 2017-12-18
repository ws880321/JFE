const path = require('path');
const webpack = require('webpack');
const packageInfo = require('./package.json');
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
        new webpack.BannerPlugin(`art-template@${version} for browser | https://github.com/aui/art-template`),
        new webpack.optimize.ModuleConcatenationPlugin(),
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