var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('../config');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = process.env.NODE_ENV === 'testing' ?
    require('./webpack.prod.conf') :
    require('./webpack.dev.conf');
var cors = require('cors');
const notifier = require('node-notifier');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable;

var app = express();

app.use(cors());

var compiler = webpack(webpackConfig);

compiler.plugin('bundle-update',
    function(newModules, changedModules, removedModules, stats) {
        if (/^win/.test(process.platform)) {
            var exec = require('child_process').exec;
            exec('C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe "' + __dirname + '/windows-notify.ps1 \\\"dev\\\" \\\"rebuilt!\\\""');
        } else {
            notifier.notify({
                title: 'dev',
                message: 'Rebuilt!',
                sound: true,
                wait: false,
            });
        }
    }
);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false,
    },
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' });
        cb();
    });
});

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context];
    if (typeof options === 'string') {
        options = { target: options };
    }
    app.use(proxyMiddleware(context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + port + '\n');
});