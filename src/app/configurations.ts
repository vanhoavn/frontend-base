import Rx, {Subscriber} from 'rxjs/Rx';

const windowSizeEmitter = Rx.Observable.create((observer) => {
    const onWindowResize = (e) => {
        observer.next({width: window.innerWidth, height: window.innerHeight});
    };
    window.addEventListener('resize', onWindowResize);
    onWindowResize(null);
    return () => {
        window.removeEventListener('resize', onWindowResize);
    };
})

const screenSizeTypeEmitter = windowSizeEmitter.map(({width, height}) => {
    if (width <= 575) return 'xs';
    if (width <= 767) return 'sm';
    if (width <= 991) return 'md';
    if (width <= 1199) return 'lg';
    return 'xl';
}).distinctUntilChanged();

const ConfigurationObservable = Rx.Observable
    .combineLatest(
        [screenSizeTypeEmitter]
    ).map(([screenSizeType]) => ({
        screenSizeType
    }));

export default ConfigurationObservable;
