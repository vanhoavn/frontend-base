(function () {
    if (typeof window.NodeList.prototype.forEach === 'undefined') {
        window.NodeList.prototype.forEach = Array.prototype.forEach;
    }

    if (typeof window.HTMLCollection.prototype.forEach === 'undefined') {
        window.HTMLCollection.prototype.forEach = Array.prototype.forEach;
    }
})();
