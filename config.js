// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
    build: {
        index: path.resolve(__dirname, 'dist/index.html'),
        assetsRoot: path.resolve(__dirname, process.env.PUBLIC_ROOT, 'statics/dist'),
        assetsSubDirectory: './',
        assetsPublicPath: '/',
        productionSourceMap: false
    },
    postcss: [
        // add prefix via postcss since it's faster
        require('autoprefixer')({
            // Vue does not support ie 8 and below
            browsers: ['last 2 versions', 'ie > 8']
        }),
        require('postcss-nested')
    ],
    cssModules: false,
    jsx: true,
    dev: {
        port: 8080,
        proxyTable: {}
    }
};