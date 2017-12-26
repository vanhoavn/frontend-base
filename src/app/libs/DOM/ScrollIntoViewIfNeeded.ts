/* eslint-disable */
import animate from 'amator';

declare interface DOMScrollIntoViewOptions {
    centerIfNeeded?: boolean;
    validTarget?: (HTMLElement) => boolean;
    animate?: any;
}

export default function ScrollIntoViewIfNeeded(elem: HTMLElement, options: DOMScrollIntoViewOptions = {}) {
    if (!elem) throw new Error('Element is required in scrollIntoViewIfNeeded');

    let centerIfNeeded = options && options.centerIfNeeded;

    function withinBounds(value, min, max, extent) {
        if (false === centerIfNeeded || max <= value + extent && value <= min + extent) {
            return Math.min(max, Math.max(min, value));
        } else {
            return (min + max) / 2;
        }
    };

    function makeArea(left, top, width, height) {
        return {
            left, top, width, height,
            right: left + width, bottom: top + height,
            translate (x, y) {
                return makeArea(x + left, y + top, width, height);
            },
            relativeFromTo: function (lhs, rhs) {
                var newLeft = left, newTop = top;
                lhs = lhs.offsetParent;
                rhs = rhs.offsetParent;
                if (lhs === rhs) {
                    return area;
                }
                for (; lhs; lhs = lhs.offsetParent) {
                    newLeft += lhs.offsetLeft + lhs.clientLeft;
                    newTop += lhs.offsetTop + lhs.clientTop;
                }
                for (; rhs; rhs = rhs.offsetParent) {
                    newLeft -= rhs.offsetLeft + rhs.clientLeft;
                    newTop -= rhs.offsetTop + rhs.clientTop;
                }
                return makeArea(newLeft, newTop, width, height);
            }
        };
    };

    var parent, area = makeArea(
        elem.offsetLeft, elem.offsetTop,
        elem.offsetWidth, elem.offsetHeight);
    while ((parent = elem.parentNode) instanceof HTMLElement) {
        if (!options.validTarget || options.validTarget(parent)) {
            var clientLeft = parent.offsetLeft + parent.clientLeft;
            var clientTop = parent.offsetTop + parent.clientTop;

            // Make area relative to parent's client area.
            area = area.relativeFromTo(elem, parent).translate(-clientLeft, -clientTop);

            var scrollLeft = withinBounds(
                parent.scrollLeft,
                area.right - parent.clientWidth, area.left,
                parent.clientWidth)
            var scrollTop = withinBounds(
                parent.scrollTop,
                area.bottom - parent.clientHeight, area.top,
                parent.clientHeight)
            if (options.animate) {
                animate(parent, {
                    scrollLeft: scrollLeft,
                    scrollTop: scrollTop
                }, options.animate)
            } else {
                parent.scrollLeft = scrollLeft
                parent.scrollTop = scrollTop
            }
        }

        // Determine actual scroll amount by reading back scroll properties.
        area = area.translate(clientLeft - parent.scrollLeft,
            clientTop - parent.scrollTop);
        elem = parent;
    }
}
