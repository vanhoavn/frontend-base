import Vue from 'vue';
import Rx from 'rxjs';
import UUID from 'uuid';

import app from './app';
/* eslint-disable camelcase */

import ConfigurationObservable from './configurations';

import _ from 'lodash';

let mixins = {
    beforeCreate() {
        this._$app_mixins = {
            timeouts: [],
            disposables: [],
            configurationsObserve: null,
        };
    },
    created() {
        if (this.hasOwnProperty('generated_id')) {
            this.generated_id = UUID();
            this.localId = (name) => {
                return `${this.generated_id}--${name}`;
            };
        }
    },
    mounted() {
        if (this.hasOwnProperty('appConfigurations')) {
            this.$observeConfigurationChanges('appConfigurations');
        }
    },
    beforeDestroy() {
        if ('_$app_mixins' in this) {
            if ('timeouts' in this._$app_mixins) {
                for (let timeoutHandle of this._$app_mixins.timeouts) {
                    window.clearTimeout(timeoutHandle);
                }
                this._$app_mixins.timeouts = [];
            }
            if ('disposables' in this._$app_mixins) {
                let toDisposes = [...this._$app_mixins.disposables];
                for (let disposable of toDisposes) {
                    disposable.unsubscribe();
                }
            }
            if ('configurationsObserve' in this._$app_mixins) {
                if (this._$app_mixins['configurationsObserve']) {
                    this._$app_mixins['configurationsObserve'].unsubscribe();
                }
            }
        }
    },
    computed: {
        $appRoot() {
            for (let $parent = this; $parent && $parent.$el && $parent._uid !== 0; $parent = $parent.$parent) {
                if ($parent.$options.name === 'app-root') {
                    return $parent;
                }
            }
            return null;
        }
    },
    methods: {
        $attributeReduce(root, attributes) {
            return attributes.reduce((a, b) => a && b in a ? a[b] : null, root);
        },
        $pageName(name) {
            if (!document.body.contains(this.$el)) {
                return;
            }

            if (this.$appRoot) this.$appRoot.pageName = name;
        },
        $extends(...args) {
            if (!args.length) return undefined;
            return Array.prototype.slice.call(args, 1).reduce((a, b) => _.assign(a, b), args[0]);
        },
        $closestVueParent(componentNameOrCssClass) {
            let $parent = this.$parent;

            while ($parent && $parent.$el && $parent._uid !== 0) {
                if ($parent.$options.name === componentNameOrCssClass || $parent.$el.classList.contains(componentNameOrCssClass)) {
                    return $parent;
                }
                $parent = $parent.$parent;
            }

            return false;
        },
        $observeConfigurationChanges(variableName) {
            if (!this.hasOwnProperty(variableName)) return;
            if (this._$app_mixins.configurationsObserve) return;
            let self = this;
            this._$app_mixins.configurationsObserve = ConfigurationObservable.subscribe(
                (config) => {
                    self.$set(self, variableName, config);
                }
            );
        },
        $observeChildrenChange(node, config = { childList: true, attributes: true, characterData: true, subtree: true }) {
            return Rx.Observable.create((observer) => {
                let mutationObserver = new window.MutationObserver((mutations) => {
                    observer.next(mutations);
                });
                mutationObserver.observe(node, config);
                return () => {
                    mutationObserver.disconnect();
                };
            });
        },
        $timeOut(fn, time) {
            if (!('_$timeout_list' in this)) {
                this._$timeout_list = [];
            }
            let that = this;
            let disposable, timeoutIdx;

            timeoutIdx = window.setTimeout(() => {
                if (disposable.disposed) return;
                disposable.unsubscribe();
                fn();
            }, time);

            disposable = {
                disposed: false,
                unsubscribe() {
                    if (this.disposed) {
                        return;
                    }
                    this.disposed = true;
                    if ('_$timeout_list' in that) {
                        let idx = that._$timeout_list.indexOf(timeoutIdx);
                        if (idx >= 0) {
                            that._$timeout_list.splice(idx, 1);
                            if (that._$timeout_list.length === 0) {
                                delete that._$timeout_list;
                            }
                        }
                    }
                },
            };

            this._$timeout_list.push(timeoutIdx);

            return disposable;
        },
    },
};

export default function install() {
    if (install.installed) return;
    install.installed = true;

    Object.defineProperty(Vue.prototype, '$app', {
        get() {
            return app;
        },
    });

    Vue.mixin(mixins);
}