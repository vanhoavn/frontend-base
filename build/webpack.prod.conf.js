var config = require('../config');
var _ = require('./utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ClosureCompilerPlugin = require('webpack-closure-compiler');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var extend = require('util')._extend;

module.exports = merge(baseWebpackConfig, {
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        publicPath: '/statics/dist/',
        filename: 'js/[name].js',
        sourceMapFilename: 'js/vhsecret-[name].map.js',
    },
    plugins: [
        new webpack.LoaderOptionsPlugin(_.loadersOptions(true)),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new ClosureCompilerPlugin({
            compiler: {
                language_in: 'ECMASCRIPT6',
                language_out: 'ECMASCRIPT5',
                compilation_level: 'SIMPLE',
                warning_level: 'QUIET',
            },
            concurrency: 12,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            sourceMap: false,
            comments: false,
        }),
        // extract css into its own file
        new ExtractTextPlugin(_.assetsPath('css/[name].css')),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true,
        }),
    ],
});
