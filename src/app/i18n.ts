import VueType, * as Vue from 'vue';

import VueI18n from 'vue-i18n';

VueType.use(VueI18n);

const messages = {
    en: require<any>('./lang/en').default,
};

const i18n = new VueI18n({
    locale: 'en',
    messages,
});

if (module.hot) {
    module.hot.accept(['./lang/en'], () => {
        i18n.setLocaleMessage('en', require<any>('./lang/en').default);
    });
}

VueType.mixin({
    computed: {
        $tf() {
            return (fallback, key, ...args) => {
                return this.$te(key, ...args) ? this.$t(key, ...args) : fallback;
            };
        },
    },
});

export default i18n;
