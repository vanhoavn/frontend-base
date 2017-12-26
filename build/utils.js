'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config');

const _ = module.exports = {};

_.assetsPath = function(_path) {
    return path.posix.join(config.build.assetsSubDirectory, _path);
};

_.cwd = (file) => {
    return path.join(process.cwd(), file || '');
};

const styleIncludePath = [
    _.cwd('src'),
];

_.cssModuleLocalIdentName = '[name]__[local]___[hash:base64:5]';

_.importLoaders = 1;

_.cssModuleLoader = (importLoader) => ({
    loader: 'css-loader',
    query: {
        autoprefixer: true,
        modules: true,
        importLoaders: importLoader,
        camelCase: true,
        localIdentName: _.cssModuleLocalIdentName,
    },
});

_.isExternal = function(module) {
    var context = module.context;
    if (typeof context !== 'string') return false;
    return context.indexOf('node_modules') >= 0;
};

_.cssLoader = config.cssModules ? _.cssModuleLoader : (importLoader) => ({
    loader: 'css-loader',
    query: {
        autoprefixer: false,
        importLoaders: importLoader,
        camelCase: true,
    },
});

_.cssProcessors = [{
        test: /\.css$/,
        moduleTest: /\.m-css$/,
        loader: null,
    },
    {
        test: /\.scss$/,
        moduleTest: /\.m-scss$/,
        loader: {
            loader: 'sass-loader',
            query: {
                sourceMap: true,
                includePaths: styleIncludePath,
            },
        },
    },
    {
        test: /\.less$/,
        moduleTest: /\.m-less$/,
        loader: {
            loader: 'less-loader',
            query: {
                sourceMap: true,
            },
        },
    },
    {
        test: /\.styl$/,
        moduleTest: /\.m-styl$/,
        loader: {
            loader: 'stylus-loader',
            query: {
                sourceMap: true,
                paths: styleIncludePath,
            },
        },
    },
    {
        test: /\.sass$/,
        moduleTest: /\.m-sass$/,
        loader: {
            loader: 'sass-loader',
            query: {
                indentedSyntax: true,
                sourceMap: true,
                includePaths: styleIncludePath,
            },
        },
    },
];

_.outputPath = config.electron ? path.join(__dirname, '../app/dist') : path.join(__dirname, '../dist');

_.outputIndexPath = config.electron ? path.join(__dirname, '../app/dist/index.html') : path.join(__dirname, '../dist/index.html');

_.target = config.electron ? 'electron-renderer' : 'web';

_.resolveOptions = {
    plugins: [],
    extensions: ['.vue', '.js', '.ts', '.tsx', '.vuex', '.styl', '.m-css', '.m-scss', '.m-sass', '.m-less', '.m-styl'],
    modules: [
        _.cwd('node_modules'),
    ],
    descriptionFiles: ['package.json'],
    mainFields: ['main', 'browser'],
    mainFiles: ['index'],
    alias: {
        'app': path.resolve(__dirname, '../src/app'),
        'jquery': path.resolve(__dirname, '../node_modules/jquery/src/jquery'),
        'vue$': 'vue/dist/vue.common.js',
        '~mixins/colorable': path.resolve(__dirname, '../node_modules/vuetify/src/mixins/colorable.js'),
    },
};

_.babelLoader = 'babel-loader';

function normalizeLoaders(lang) {
    if (typeof lang === 'string') {
        return lang;
    } else {
        let ext = '?' + JSON.stringify(lang.query || {});
        if (ext === '?{}') {
            return lang.loader;
        } else {
            return lang.loader + ext;
        }
    }
}

_.loaderListToString = (list) => {
    return list.map(normalizeLoaders).join('!');
};

// https://github.com/egoist/vbuild/blob/master/lib/vue-loaders.js
_.vueLoaders = (isProd) => {
    if (typeof isProd === 'undefined') {
        isProd = process.env.NODE_ENV === 'production';
    }

    function generateLoader(langs) {
        langs.unshift({
            loader: 'css-loader',
            query: {
                autoprefixer: false,
                sourceMap: true,
                camelCase: true,
                importLoaders: langs.length,
                minimize: isProd,
            },
        });
        if (!isProd) {
            return _.loaderListToString(
                [{
                    loader: 'vue-style-loader',
                }, ].concat(langs)
            );
        }
        return ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: _.loaderListToString(langs),
        });
    }

    return {
        css: generateLoader([]),
        sass: generateLoader([{
            loader: 'sass-loader',
            query: {
                sourceMap: true,
                indentedSyntax: true,
                includePaths: styleIncludePath,
            },
        }]),
        scss: generateLoader([{
            loader: 'sass-loader',
            query: {
                sourceMap: true,
                includePaths: styleIncludePath,
            },
        }]),
        less: generateLoader(['less-loader?sourceMap']),
        stylus: generateLoader([{
            loader: 'stylus-loader',
            query: {
                sourceMap: true,
                paths: styleIncludePath,
            },
        }]),
        js: _.loaderListToString([
            _.babelLoader,
        ]),
        ts: _.loaderListToString([{
            loader: 'ts-loader',
        }, ]),
        tsx: _.loaderListToString([
            _.babelLoader,
            {
                loader: 'ts-loader',
            },
        ]),
    };
};
_.loadersOptions = (isProd) => {
    if (typeof isProd === 'undefined') {
        isProd = process.env.NODE_ENV === 'production';
    }

    return {
        minimize: isProd,
        debug: false,
        options: {
            // css-loader relies on context
            context: process.cwd(),
            // postcss plugins apply to .css files
            postcss: config.postcss,
            resolve: _.resolveOptions,
            vue: {
                // postcss plugins apply to css in .vue files
                postcss: config.postcss,
                loaders: _.vueLoaders(isProd),
            },
        },
    };
};

_.styleLoaders = () => {
    let allLoaders = [];
    _.cssProcessors.forEach(processor => {
        let loaders;
        if (processor.loader === null) {
            loaders = [{
                loader: 'postcss-loader',
            }, ];
        } else {
            loaders = [{
                    loader: 'postcss-loader',
                },
                processor.loader,
            ];
        }
        allLoaders.push({
            test: processor.test,
            use: [{
                    loader: 'vue-style-loader',
                },
                _.cssLoader(loaders.length),
            ].concat(loaders),
        });
        allLoaders.push({
            test: processor.moduleTest,
            use: [{
                    loader: 'vue-style-loader',
                },
                _.cssModuleLoader(loaders.length),
            ].concat(loaders),
        });
    });
    return allLoaders;
};