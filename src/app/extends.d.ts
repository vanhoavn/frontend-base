///<reference path="features/Gallery/index.d.ts"/>
import {Subscription, Observable} from 'rxjs/Rx';

import VueType, * as Vue from 'vue';
import VueI18n from 'vue-i18n';

declare module 'vue/types/options' {
    interface ComponentOptions<V extends VueType> {
        localStorage?: any;
        http?: (vuejs.HttpOptions & { headers?: vuejs.HttpHeaders } & { [key: string]: any })
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        // CustomerSupport
        $app: App;

        // vue-localstorage
        $localStorage: any;

        $http: vuejs.Http;

        $els: any;

        $style?: { [name: string]: string };

        $tf(fallback: string, string: VueI18n.Path, params?: VueI18n.Values): VueI18n.TranslateResult;

        localId(name: any): string;

        // vue-router

        // vue-rx
        // TODO: Rx.Observer<T> is wrong here
        $watchAsObservable<T>(exprOrFn: (() => any) | string, options?: any): any;

        $fromDOMEvent<T>(selector: string, event: string): any;

        $observeChildrenChange(element: HTMLElement, options?: MutationObserverInit): Observable<MutationRecord[]>;

        $timeOut(fn: (() => any), timeout?: number): Subscription;

        $attributeReduce(root: any, attributes: string[]): any;

        $extends(...objects: any[]): any;

        $pageName(name: string);

        $observeConfigurationChanges(propName: string);

        $closestVueParent(componentNameOrCssClass: string): Vue | null;

        $gallery(links: GalleryItem[], options?: GalleryOptions);
    }
}

declare module 'vue/types/options' {
    interface ____TmpComponentOptionsExtended<V extends VueType> extends Vue.ComponentOptions<V> {
        components?: {
            [key: string]: any
        };
    }

    interface ComponentOptionsExtended<V extends VueType> extends ____TmpComponentOptionsExtended<V> {
        name?: string,
        components?: {
            [key: string]: VztVueSimpleClass<V> | VztVueSimpleClass<VueType> | Vue.Component | Vue.AsyncComponent
        };
    }
}
