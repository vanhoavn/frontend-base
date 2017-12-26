import VueType, * as Vue from 'vue';

const ns = '_ns_{{snakeCase name}}';

class {{properCase name}} {
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

const DirectiveOptions : Vue.DirectiveOptions = {
    bind(el: HTMLElement,
         binding: Vue.VNodeDirective,
         vnode: Vue.VNode,
         oldVnode: Vue.VNode) {
        el[ns] = new {{properCase name}}(el, binding);
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
