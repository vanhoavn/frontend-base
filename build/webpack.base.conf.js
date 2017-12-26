var path = require('path');
var config = require('../config');
var _ = require('./utils');
var projectRoot = path.resolve(__dirname, '../');
var webpack = require('webpack');
var extend = require('util')._extend;
const HappyPack = require('happypack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var BundleUpdateHookPlugin = require('webpack-bundle-update-hook-plugin');

var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const enableHappyPack = process.env.DISABLE_THREADS !== '1';

let speedBabelLoader = _.babelLoader;

if (enableHappyPack) {
    speedBabelLoader = 'happypack/loader';
}

module.exports = {
    entry: {
        'app': [path.join(__dirname, '../src/app/main.ts')],
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: 'http://127.0.0.1:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        sourceMapFilename: '[name].[hash].js.map',
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
    },
    resolve: _.resolveOptions,
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
        }),
        new webpack.DefinePlugin({
            'require.specified': 'require.resolve',
        }),
        new BundleUpdateHookPlugin(),
        //new HardSourceWebpackPlugin()
    ].concat(
        enableHappyPack ? [
            new HappyPack({
                threads: 6,
                loaders: [_.babelLoader]
            }),
            new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
        ] : []
    ),
    resolveLoader: {
        modules: [_.cwd('node_modules')],
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: projectRoot,
                exclude: /\b(node_modules|libs|modernizr\.js)\b/,
            },
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                enforce: 'pre',
                include: projectRoot,
                exclude: /\b(node_modules|libs)\b/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /\b(node_modules|libs|modernizr\.js)\b/,
                options: {
                    esModule: true,
                    preserveWhitespace: false,
                    cssModules: {
                        autoprefixer: true,
                        modules: true,
                        importLoaders: 2,
                        camelCase: true,
                        localIdentName: _.cssModuleLocalIdentName,
                    },
                },
            },
            {
                test: /\.vuex$/,
                loader: 'vue-loader',
                exclude: /\b(node_modules|libs|modernizr\.js)\b/,
                options: {
                    esModule: true,
                    preserveWhitespace: false,
                    cssModules: {
                        autoprefixer: true,
                        modules: true,
                        importLoaders: 2,
                        camelCase: true,
                        localIdentName: _.cssModuleLocalIdentName,
                    },
                },
            },
            {
                test: /\.js$/,
                loader: speedBabelLoader,
                include: projectRoot,
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                loader: speedBabelLoader,
                include: path.resolve(projectRoot, 'node_modules/vue/src'),
                exclude: /node_modules/,
            },
            {
                test: /\.ts$/,
                include: projectRoot,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        happyPackMode: enableHappyPack,
                        appendTsSuffixTo: [/\.vue$/],
                        appendTsxSuffixTo: [/\.vuex$/],
                    },
                }, ],
            },
            {
                test: /\.tsx$/,
                include: projectRoot,
                exclude: /node_modules/,
                use: [
                    _.babelLoader,
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: enableHappyPack,
                            appendTsSuffixTo: [/\.vue$/],
                            appendTsxSuffixTo: [/\.vuex$/],
                        },
                    },
                ],
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.html$/,
                loader: 'vue-html-loader?interpolate=require&minimize=true&conservativeCollapse=false',
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: _.assetsPath('/imgs/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: _.assetsPath('/fonts/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /(pnotify|summernote).*\.js$/,
                loader: 'imports-loader?define=>false,global=>window',
            },
            {
                test: /typeahead.*\.js$/,
                loader: 'imports-loader?define=>false,this=>window,global=>window',
            },
            { test: /\.coffee$/, loader: 'coffee-loader' },
            { test: /\.(coffee\.md|litcoffee)$/, loader: 'coffee-loader?literate' },
        ].concat(_.styleLoaders()),
    },
};