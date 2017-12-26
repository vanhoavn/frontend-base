import 'blueimp-gallery/css/blueimp-gallery.css';
import 'blueimp-gallery/css/blueimp-gallery-indicator.css';
import 'blueimp-gallery/css/blueimp-gallery-video.css';

import $ from 'jquery';
import Gallery from 'blueimp-gallery';

export default function install(Vue) {
    if (!(install as any).installed) {
        (install as any).installed = true;
        Vue.mixin({
            methods: {
                $gallery(link, options) {
                    if (!document.querySelector('#blueimp-gallery')) {
                        $(document.body).append($(`
                    <div id="blueimp-gallery" class="blueimp-gallery">
                        <div class="slides"></div>
                        <h3 class="title"></h3>
                        <span class="prev">‹</span>
                        <span class="next">›</span>
                        <span class="close">×</span>
                        <span class="play-pause"></span>
                        <ol class="indicator"></ol>
                    </div>
                    `.replace(/\s+/g, ' ')));
                    }
                    Gallery(link, $.extend({stopTouchEventsPropagation: true}, options));
                },
            },
        });
    }
}
