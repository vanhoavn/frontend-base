require('es6-promise').polyfill();

import './polyfill-fix';
import 'moment-timezone';

import Moment from 'moment';
import {extendMoment} from 'moment-range';

extendMoment(Moment);

import VueType from 'vue';

import '../modernizr';

window.Modernizr.addTest('idevice', function () {
    return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
});

import VueRouter from 'vue-router';

import VueResource from 'vue-resource';

import VueLocalStorage from 'vue-localstorage';

import VueTouch from './features/Touch';

import VGallery from './features/Gallery';

VueType.use(VueResource);
VueType.use(VueLocalStorage);
VueType.use(VueTouch);
VueType.use(VueRouter);

import Fuse from 'fuse.js';

VueType.prototype.$search = function (term, list, options) {
    var run = new Fuse(list, options);
    var results = run.search(term);
    return results;
};

import OverlayScrollingFeature from './features/OverlayScrolling';

VueType.use(OverlayScrollingFeature);

import './ui-components-register';
import './ui-directives-register';

VueTouch.registerCustomEvent('doubletap', {
    type: 'tap',
    taps: 2,
});

(function () {
    VueType.use(require('./app-vue-mixin').default);
    VueType.use(VGallery);
})();
