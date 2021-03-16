

function init() {
  'use strict';
  
  console.log('Reader Mode Starting up');

  var _private = {
    article: void 0,
    date: void 0,
    anchor: document.getElementById('CAM-Extension-Anchor'),
    documentClone: document.cloneNode(true),
    meta: document.getElementsByTagName("META"),
    images: getAllImages()
  };

  console.log('inside init');


  var options = {
    debug: true, // developer mode
    maxElemsToParse: 0, // DEFAULT_MAX_ELEMS_TO_PARSE
    charThreshold: 10, // DEFAULT_CHAR_THRESHOLD
    classesToPreserve: '', // CLASSES_TO_PRESERVE
    keepClasses: false, // keepClasses
    DEFAULT_TAGS_TO_SCORE: 'section,h2,h3,h4,h5,h6,p,td,pre,li'
  };
  _private.article = new Readability(_private.documentClone).parse();

  console.log('Reader Mode INIT', _private.anchor);
  console.log('checking new anchor required:', !_private.anchor);

  if (!_private.anchor) {
    console.log(_private.article.title);
    console.log(_private.article.length);
    console.log(_private.article.excerpt);
    console.log(_private.article.byline);
    console.log(_private.article.dir);

    ReadOutLoud(_private.article);
    _private.anchor = document.createElement("div");
    _private.anchor.id = "CAM-Extension-Anchor";
    _private.anchor.style.fontSize = "10px";
    _private.anchor.style.width = "70%";
    _private.anchor.style.border = "3px solid red";
    _private.anchor.style.margin = "0 auto";
    _private.anchor.style.height = "200px";
    _private.anchor.style.overflowY = "scroll";
    _private.anchor.innerHTML = _private.article.content;

    console.log('Reader mode attached');
    document.body.appendChild(_private.anchor);
  }

  function getAllImages() {
    if (_private.images) {
      return _private.images;
    }

    _private.images = Array.from(document.images)
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



  function collectAllStaticAssets() {
    var allImages = [];


    let temp1 = Array.from(document.images).reduce((collection, img) => {
      if (img.naturalWidth > 400) {
        collection.push(img.currentSrc);
      }
      return collection;
    }, []);
    allImages.concat(temp1);


    let staticAssetDownloadButton = document.createElement('button');
    staticAssetDownloadButton.type = 'submit';
    staticAssetDownloadButton.onclick = function() {
      window.open('')
    };
    staticAssetDownloadButton.innerHTML = 'Download All Images';
  }


  Array.from(document.querySelectorAll('*'))
    .reduce((collection, node) => {
      let prop = window.getComputedStyle(node, null)
        .getPropertyValue('background-image');
      if (prop.indexOf('url') >= 0)
         collection.add(prop);
    });


  // css
  function getAllStyleSheetURLs() {
    Array.from(document.styleSheets)
      .map((stylesheet) => {
        return stylesheet.href;
      });
  }




  (function getAllMetaTags() {
    Array.from(_private.meta)
      .filter(meta => {
        return (meta.content || meta.name || meta.attributes.property);
      })
      .map(meta => {
        return {
          content: meta.content,
          name: meta.name,
          property: meta.getAttribute("property") // attributes.property
        };
      });
  })();

  function getAllLinks() {
    return Array.from(document.links);
  };

  function getKeyWords() {
    var keywords = document.querySelector("meta[name='keywords']");
    return keywords && keywords.getAttribute("content") || "";
  };

  function getAllUniqueWords() {
    var innerText = document.body.innerText;
    innerText = innerText.repalaceSpecialChars();
  }

  function thisDayThatYear() {
    getDate();
  }

  function generateTags() {

  }

  function getDate() {
    if (_private.date) {
      return _private.date;
    }

    _private.date = new Date();

  }


  function ReadOutLoud(article) {
    var defaultVoice;
    var utterance;

    defaultVoice = window.speechSynthesis.getVoices().filter(voice => {
      return voice.lang === 'en-US';
    })[0];
    utterance = new SpeechSynthesisUtterance('Here goes your font'); //_private.article.content.innerText
    utterance.rate = 0.7;
    utterance.pitch = 1.4;
    utterance.voice = defaultVoice;
    window.speechSynthesis && window.speechSynthesis.speak(utterance);
  }

  return {
    "referrer": document.referrer, // to understand how the user arrived at this page
    "baseURI": document.baseURI, // if the document has a base element (not sure, but I think it'll be useful)
    "href": document.location.href, // the usual URL of the page
    "cookies": document.cookie, // just to sniff what are these companies upto (may be useful)
    "title": document.title, // e.g. "Indian, Chinese Troops Mutually Pull Back From Most Ladakh Areas: Sources",
    "article-title": _private.article.title,
    "article-content": _private.article.content,
    "key-words": getKeyWords(), // e.g. "Ladakh,India-China Standoff",
    "date": getDate(), // date is really important
    "links": getAllLinks(), // why tho? I really don't know'
    "tags": generateTags(),
    "images": getAllImages(),
    "annotation": getAnnotation(), // let's support mark-down
  }
}

document.addEventListener('DOMContentLoaded', init);
window.setTimeout(init, 0);


