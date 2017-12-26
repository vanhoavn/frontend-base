declare module 'app' {
    import {Subscription, Observable} from 'rxjs/Rx';

    import VueType, * as Vue from 'vue';
    import VueI18n from 'vue-i18n';

    global {
        interface NumberConstructor {
            ['@@vueTag']: number
        }

        interface StringConstructor {
            ['@@vueTag']: string
        }

        interface BooleanConstructor {
            ['@@vueTag']: boolean
        }

        type VztVueSimpleClass<T> = {
            new(): T
            extend(option: Vue.ComponentOptions<VueType> | Vue.FunctionalComponentOptions): VueType
        }

        namespace JSX {
            interface Element extends Vue.VNode {
            }

            interface ElementClass extends VueType {
            }

            interface ElementAttributesProperty {
                $props: {};
            }

            interface IntrinsicElements {
                [name: string]: any;
            }

            interface IntrinsicAttributes {
                key?: string | number
                staticClass?: string
                ref?: string
                refInFor?: boolean
                slot?: string
                scopedSlots?: any
            }
        }

        interface NavigationComponentsRegistations {
            // [name: string]: Vue;
            leftNavigation?: VueType
            titleBarLeftButtons?: VueType
            rightNavigation?: VueType
            titleBarRightButtons?: VueType
            titleBarExtension?: VueType
        }

        interface AppConfig {
            APP_ROOT: string
        }

        type ScreenTypeEnum = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

        interface AppConfigurations {
            screenSizeType: ScreenTypeEnum;
        }

        interface AppDataSource {
        }

        interface App extends AppDataSource {
            config: AppConfig,
        }

        type APIEndpoint = string;

        interface ZonGlobalConfig {
            apiEndpoints: {
            },
            me: {
                id: number,
                name: string,
                email: string,
            };
        }

        interface Window {
            Modernizr: any;
        }
    }
}

