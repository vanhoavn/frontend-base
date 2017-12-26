import VueType, * as Vue from 'vue';

const sr = require<any>('scrollreveal')();


const ns = '_ns_scroll_reveal';

class ScrollReveal {
    protected el: HTMLElement;

    constructor(el: HTMLElement, binding: Vue.VNodeDirective) {
        this.el = el;
        this.update(binding);
    }

    update(binding: Vue.VNodeDirective) {
        if (binding.value) {

        }
    }

    destroy() {
    }
}

const DirectiveOptions: Vue.DirectiveOptions = {
    bind(el: HTMLElement,
         binding: Vue.VNodeDirective,
         vnode: Vue.VNode,
         oldVnode: Vue.VNode) {
        el[ns] = new ScrollReveal(el, binding);
    },
    componentUpdated(el: HTMLElement,
                     binding: Vue.VNodeDirective,
                     vnode: Vue.VNode,
                     oldVnode: Vue.VNode) {
        if (ns in el) {
            el[ns].update(binding);
        }
    },
    unbind(el, binding, vnode) {
        if (ns in el) {
            el[ns].destroy();
        }
    },
};

export default DirectiveOptions;
