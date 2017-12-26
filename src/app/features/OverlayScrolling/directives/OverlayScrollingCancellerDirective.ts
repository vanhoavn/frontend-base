import stopParentScrolling, {ScrollDisablingDisposable} from '../OverlayScrollFix';

import VueType, * as Vue from 'vue';

const ns = '_stop_parent_scrolling';

class StopParentScrolling {
    protected el: HTMLElement;
    protected scrollingDisposable: ScrollDisablingDisposable = null;

    constructor(el: HTMLElement, binding: Vue.VNodeDirective) {
        this.el = el;
        this.update(binding);
    }

    update(binding: Vue.VNodeDirective) {
        if (binding.value) {
            this.enable();
        } else {
            this.disable();
        }
    }

    destroy() {
        this.disable();
    }

    private enable() {
        if (this.scrollingDisposable === null) {
            this.scrollingDisposable = stopParentScrolling(this.el);
        }
    }

    private disable() {
        if (this.scrollingDisposable !== null) {
            this.scrollingDisposable.unsubscribe();
            this.scrollingDisposable = null;
        }
    }
}

const DirectiveOptions : Vue.DirectiveOptions = {
    bind(el: HTMLElement,
         binding: Vue.VNodeDirective,
         vnode: Vue.VNode,
         oldVnode: Vue.VNode) {
        el[ns] = new StopParentScrolling(el, binding);
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
