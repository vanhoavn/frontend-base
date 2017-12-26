require('./boot')

import VueType, * as Vue from 'vue';
import i18n from './i18n';
import VueRouter from 'vue-router';

require('./app');

import config from './config';

const router = new VueRouter({
    mode: 'history',
    routes: [],
});

window.addEventListener('load', function () {
    new VueType({
        i18n,
        el: config.APP_ROOT,
        router,
        components: {},
        data() {
            return {
                pageName: 'App',
            };
        },
        mounted() {
        },
        methods: {
        },
    });
}, false);
