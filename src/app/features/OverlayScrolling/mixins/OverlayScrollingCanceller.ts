import stopParentScrolling from '../OverlayScrollFix';

export default {
    beforeDestroy() {
        this.maybeScrollingDispose();
    },
    methods: {
        registerScrollingOverlay(el: HTMLElement) {
            this.scrollingDisposable = stopParentScrolling(el);
        },
        maybeScrollingDispose() {
            if (this.scrollingDisposable) {
                this.scrollingDisposable.unsubscribe();
                this.scrollingDisposable = null;
            }
        },
    },
};
