import VueType, * as Vue from 'vue';

let component: Vue.FunctionalComponentOptions = {
    functional: true,
    render: function (h: Vue.CreateElement, context: Vue.RenderContext): Vue.VNode {
        let {attrs} = context.data;

       return (<div></div>)
    }
};

export default component;
