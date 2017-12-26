interface GalleryItemObject {
    href: string;
    title?: string;
    type?: string;
    thumbnail?: string;
}

type GalleryItem = string | GalleryItemObject;

interface GalleryOptions {
    // The Id, element or querySelector of the gallery widget:
    container?: string; // default '#blueimp-gallery'
    // The tag name, Id, element or querySelector of the slides container:
    slidesContainer?: string; // default 'div'
    // The tag name, Id, element or querySelector of the title element:
    titleElement?: string; // default 'h3'
    // The class to add when the gallery is visible:
    displayClass?: string; // default 'blueimp-gallery-display'
    // The class to add when the gallery controls are visible:
    controlsClass?: string; // default 'blueimp-gallery-controls'
    // The class to add when the gallery only displays one element:
    singleClass?: string; // default 'blueimp-gallery-single'
    // The class to add when the left edge has been reached:
    leftEdgeClass?: string; // default 'blueimp-gallery-left'
    // The class to add when the right edge has been reached:
    rightEdgeClass?: string; // default 'blueimp-gallery-right'
    // The class to add when the automatic slideshow is active:
    playingClass?: string; // default 'blueimp-gallery-playing'
    // The class for all slides:
    slideClass?: string; // default 'slide'
    // The slide class for loading elements:
    slideLoadingClass?: string; // default 'slide-loading'
    // The slide class for elements that failed to load:
    slideErrorClass?: string; // default 'slide-error'
    // The class for the content element loaded into each slide:
    slideContentClass?: string; // default 'slide-content'
    // The class for the "toggle" control:
    toggleClass?: string; // default 'toggle'
    // The class for the "prev" control:
    prevClass?: string; // default 'prev'
    // The class for the "next" control:
    nextClass?: string; // default 'next'
    // The class for the "close" control:
    closeClass?: string; // default 'close'
    // The class for the "play-pause" toggle control:
    playPauseClass?: string; // default 'play-pause'
    // The list object property (or data attribute) with the object type:
    typeProperty?: string; // default 'type'
    // The list object property (or data attribute) with the object title:
    titleProperty?: string; // default 'title'
    // The list object property (or data attribute) with the object URL:
    urlProperty?: string; // default 'href'
    // The list object property (or data attribute) with the object srcset URL(s):
    srcsetProperty?: string; // default 'urlset'
    // The gallery listens for transitionend events before triggering the
    // opened and closed events, unless the following option is set to false:
    displayTransition?: boolean; // default true
    // Defines if the gallery slides are cleared from the gallery modal,
    // or reused for the next gallery initialization:
    clearSlides?: boolean; // default true
    // Defines if images should be stretched to fill the available space,
    // while maintaining their aspect ratio (will only be enabled for browsers
    // supporting background-size="contain", which excludes IE < 9).
    // Set to "cover", to make images cover all available space (requires
    // support for background-size="cover", which excludes IE < 9):
    stretchImages?: boolean; // default false
    // Toggle the controls on pressing the Return key:
    toggleControlsOnReturn?: boolean; // default true
    // Toggle the controls on slide click:
    toggleControlsOnSlideClick?: boolean; // default true
    // Toggle the automatic slideshow interval on pressing the Space key:
    toggleSlideshowOnSpace?: boolean; // default true
    // Navigate the gallery by pressing left and right on the keyboard:
    enableKeyboardNavigation?: boolean; // default true
    // Close the gallery on pressing the ESC key:
    closeOnEscape?: boolean; // default true
    // Close the gallery when clicking on an empty slide area:
    closeOnSlideClick?: boolean; // default true
    // Close the gallery by swiping up or down:
    closeOnSwipeUpOrDown?: boolean; // default true
    // Emulate touch events on mouse-pointer devices such as desktop browsers:
    emulateTouchEvents?: boolean; // default true
    // Stop touch events from bubbling up to ancestor elements of the Gallery:
    stopTouchEventsPropagation?: boolean; // default false
    // Hide the page scrollbars:
    hidePageScrollbars?: boolean; // default true
    // Stops any touches on the container from scrolling the page:
    disableScroll?: boolean; // default true
    // Carousel mode (shortcut for carousel specific options):
    carousel?: boolean; // default false
    // Allow continuous navigation, moving from last to first
    // and from first to last slide:
    continuous?: boolean; // default true
    // Remove elements outside of the preload range from the DOM:
    unloadElements?: boolean; // default true
    // Start with the automatic slideshow:
    startSlideshow?: boolean; // default false
    // Delay in milliseconds between slides for the automatic slideshow:
    slideshowInterval?: number; // default 5000
    // The starting index as integer.
    // Can also be an object of the given list,
    // or an equal object with the same url property:
    index?: number; // default 0
    // The number of elements to load around the current index:
    preloadRange?: number; // default 2
    // The transition speed between slide changes in milliseconds:
    transitionSpeed?: number; // default 400
    // The transition speed for automatic slide changes, set to an integer
    // greater 0 to override the default transition speed:
    slideshowTransitionSpeed?: number,
    // The event object for which the default action will be canceled
    // on Gallery initialization (e.g. the click event to open the Gallery):
    event?: any,
    // Callback function executed when the Gallery is initialized.
    // Is called with the gallery instance as "this" object:
    onopen?: Function,
    // Callback function executed when the Gallery has been initialized
    // and the initialization transition has been completed.
    // Is called with the gallery instance as "this" object:
    onopened?: Function,
    // Callback function executed on slide change.
    // Is called with the gallery instance as "this" object and the
    // current index and slide as arguments:
    onslide?: Function,
    // Callback function executed after the slide change transition.
    // Is called with the gallery instance as "this" object and the
    // current index and slide as arguments:
    onslideend?: Function,
    // Callback function executed on slide content load.
    // Is called with the gallery instance as "this" object and the
    // slide index and slide element as arguments:
    onslidecomplete?: Function,
    // Callback function executed when the Gallery is about to be closed.
    // Is called with the gallery instance as "this" object:
    onclose?: Function,
    // Callback function executed when the Gallery has been closed
    // and the closing transition has been completed.
    // Is called with the gallery instance as "this" object:
    onclosed?: Function
}
