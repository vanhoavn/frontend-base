import VueType, * as Vue from 'vue';
import {VueBase, Component, Watch, Prop, Inject, Provide, Model, Mixin, Mixedin} from 'app/libs/VZTVueDecorated';


@Component({
    components: {},
})
export default class VueLifecyclesState extends VueBase {
    isMounted: boolean = false;
    isActivated: boolean = false;

    mounted() {
        this.$nextTick(
            () => {
                this.isMounted = true;
                this.isActivated = true;
            }
        );
    }

    activated() {
        this.$nextTick(() => {
            this.isActivated = true;
        });
    }

    deactivated() {
        this.isActivated = false;
    }

    destroyed() {
        this.isMounted = false;
        this.isActivated = false;
    }
}
