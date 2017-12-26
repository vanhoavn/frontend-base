/* eslint-disable */
require('eventsource-polyfill');
// var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
//var hotClient = require('webpack-hot-middleware/client?path=http://127.0.0.1:8080/__webpack_hmr&reload=false');
var hotClient = require('webpack-hot-middleware/client?autoConnect=false');

if (!process.env.DISABLE_HRM) {
    hotClient.setOptionsAndConnect({
        path: 'http://' + (process.env.PUBLIC_HOST || '127.0.0.1:8080') + '/__webpack_hmr',
        reload: false
    });

    hotClient.subscribe(function(event) {
        if (event.action === 'reload') {
            window.location.reload();
        }
    });
}