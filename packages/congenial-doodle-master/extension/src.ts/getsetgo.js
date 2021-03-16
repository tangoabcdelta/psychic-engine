var Extension = /** @class */ (function () {
    function Extension() {
    }
    Extension.prototype.getAllImages = function () {
        return Array.from(document.images)
            .map(function (img) { return ({
            src: img.currentSrc,
            srcset: img.srcset,
            width: img.naturalWidth,
            height: img.naturalHeight,
            alt: img.alt
        }); })
            .sort(function (img1, img2) {
            return img1.naturalHeight - img2.naturalHeight;
        });
    };
    return Extension;
}());
