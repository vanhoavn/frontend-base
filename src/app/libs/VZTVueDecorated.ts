import VueType, * as Vue from 'vue';

import {ComponentOptionsExtended} from 'vue/types/options';

import {createDecorator} from 'vue-class-component';

import {Component as _Component} from 'vue-property-decorator';

export {Inject, Model, Prop, Provide, Watch} from 'vue-property-decorator';
export {Mixin, Mixedin} from './VueMixins';

export function Component<U extends VueType>(options: ComponentOptionsExtended<U>): <V extends VztVueSimpleClass<VueType>>(target: V) => V
export function Component<V extends VztVueSimpleClass<Vue>>(target: V): V
export function Component<T>(...args: any[]): any {
    return (_Component as any)(...args) as any;
}

/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
export function ProvideClosure(key?) {
    return createDecorator(function (componentOptions, k) {
        let provide: any = componentOptions.provide;
        if (typeof provide !== 'function' || !provide.closure_managed) {
            var original_1 = componentOptions.provide;
            provide = componentOptions.provide = function () {
                var rv = Object.create((typeof original_1 === 'function' ? original_1.call(this) : original_1) || null);
                for (var i in provide.closure_managed)
                    rv[provide.closure_managed[i]] = (function () {
                        return this[i]();
                    }).call(this);
                return rv;
            };
            provide.closure_managed = {};
        }
        provide.closure_managed[k] = key || k;
    });
}

export const VueBase = VueType as any as VztVueSimpleClass<VueType>;
