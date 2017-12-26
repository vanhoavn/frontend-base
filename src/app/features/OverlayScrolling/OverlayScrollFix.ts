import $ from 'jquery';
const MODAL_INNER_PROP = 'app-have-open-modal';

const scrollLock = ( function scrollLockClosure() {
    const $html      = $( 'html' );
    const $body      = $( 'body:first' );
        // State: unlocked by default
    let locked     = false;
        // State: scroll to revert to
    let prevScroll = {
            scrollLeft : $( window ).scrollLeft(),
            scrollTop  : $( window ).scrollTop(),
        };
    // State: styles to revert to
    const prevStyles = {};
    const lockStyles = {
            overflow   : 'hidden',
            position   : 'fixed',
            width      : '100%',
        };

    // Instantiate cache in case someone tries to unlock before locking
    saveStyles();

    // Save context's inline styles in cache
    function saveStyles() {
        const styleAttr = $html.attr( 'style' );
        let styleStrs = [];
        const styleHash = {};

        if ( !styleAttr ) {
            return;
        }

        styleStrs = styleAttr.split( /;\s/ );

        $.each( styleStrs, function serializeStyleProp( styleString: string ){
            if ( !styleString ) {
                return;
            }

            const keyValue = styleString.split( /\s:\s/ );

            if ( keyValue.length < 2 ) {
                return;
            }

            styleHash[ keyValue[ 0 ] ] = keyValue[ 1 ];
        } );

        $.extend( prevStyles, styleHash );
    }

    function lock() {
        const appliedLock = {};

        // Duplicate execution will break DOM statefulness
        if ( locked ) {
            return;
        }

        // Save scroll state...
        prevScroll = {
            scrollLeft : $( window ).scrollLeft(),
            scrollTop  : $( window ).scrollTop(),
        };

        // ...and styles
        saveStyles();

        // Compose our applied CSS
        $.extend( appliedLock, lockStyles, {
            // And apply scroll state as styles
            left : - prevScroll.scrollLeft + 'px',
            top  : - prevScroll.scrollTop  + 'px',
            height : $body[0].scrollHeight + 'px',
        } );

        // Then lock styles...
        $html.css( appliedLock );

        // ...and scroll state
        $( window )
            .scrollLeft( 0 )
            .scrollTop( 0 );

        locked = true;
    }

    function unlock() {
        // Duplicate execution will break DOM statefulness
        if ( !locked ) {
            return;
        }

        // Revert styles
        $html.attr( 'style', $( '<x>' ).css( prevStyles ).attr( 'style' ) || '' );

        // Revert scroll values
        $( window )
            .scrollLeft( prevScroll.scrollLeft )
            .scrollTop(  prevScroll.scrollTop );

        locked = false;
    }

    return function _scrollLock( on ) {
        // If an argument is passed, lock or unlock depending on truthiness
        if ( arguments.length ) {
            if ( on ) {
                lock();
            } else {
                unlock();
            }
            // Otherwise, toggle
        } else {
            if ( locked ) {
                unlock();
            } else {
                lock();
            }
        }
    };
}() );

export class ScrollDisablingDisposable {
    private $target: JQuery;
    private disposed: boolean;

    constructor($target: JQuery) {
        this.$target = $target;
        this.disposed = false;
    }

    unsubscribe() {
        if (this.disposed) {
            return;
        }
        this.disposed = true;
        let currentOpenCount = parseInt(this.$target.attr(MODAL_INNER_PROP), 10) || 0;
        if (currentOpenCount > 0) {
            --currentOpenCount;
            if (currentOpenCount === 0) {
                this.$target.removeAttr(MODAL_INNER_PROP);
                scrollLock( false );
            } else {
                this.$target.attr(MODAL_INNER_PROP, `${currentOpenCount}`);
            }
        } else {
            console.error('Something got wrong, open count is less than zero');
        }
    }
}

const stopParentScrolling = (el: HTMLElement): ScrollDisablingDisposable|null => {
    const $body = $(el).closest('#vueApp');
    if ($body) {
        const nextLevel = parseInt($body.attr(MODAL_INNER_PROP) || '0', 10) + 1;
        $body.attr(MODAL_INNER_PROP, `${nextLevel}`);
        if (nextLevel === 1) {
            scrollLock( true );
        }
        return new ScrollDisablingDisposable($body);
    }
    return null;
};

export default stopParentScrolling;
