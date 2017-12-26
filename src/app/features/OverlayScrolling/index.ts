import OverlayScrollingCanceller from './directives/OverlayScrollingCancellerDirective';

export default function install(module: any) {
    if ((install as any).installed) {
        return;
    }
    (install as any).installed = true;

    module.directive('zon-feature-overlay-scrolling-canceller', OverlayScrollingCanceller);
}
