<template>
    <div :class="$style.container">

    </div>
</template>

<style lang="stylus" module>
    @import "app/stylesheets/config";
    .container {

    }
</style>
{{#xif "['tx','tsx'].indexOf(lang)"}}
<script lang="tsx">
    import VueType, * as Vue from 'vue';
    import {VueBase, Component, Watch, Prop, Inject, Provide, ProvideClosure, Model, Mixin, Mixedin} from 'app/libs/VZTVueDecorated';

    @Component({})
    export default class {{pascalCase name}} extends VueBase {
        // region Vue Instance lifecycles
        // endregion
        // region computed properties
        // endregion
        // region Async state mutators (async triggers), Watcher Entries
        // endregion
        // region Events triggers
        // endregion
        // region Domain/Feature orientated components
        // endregion
    }
</script>
{{else}}
<script>
    export default {
        name: '{{dashCase name}}',
        props: [],
    };
</script>
{{/xif}}
