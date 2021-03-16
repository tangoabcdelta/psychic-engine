class Extension {
    images: Array<any>;
    
    constructor() {
    }
    
    getAllImages() {
        return Array.from(document.images)
        .map(img => ({
            src: img.currentSrc,
            srcset: img.srcset,
            width: img.naturalWidth,
            height: img.naturalHeight,
            alt: img.alt
        }))
        .sort((img1, img2) => {
            return img1.naturalHeight - img2.naturalHeight;
        });
    }
}


