// extending mozilla's readability code
// https://github.com/mozilla/readability/blob/master/Readability.js

var __MASTER__ = {
  constants: {

  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,

  // Element tags to score by default.
  DEFAULT_TAGS_TO_SCORE: "section,h2,h3,h4,h5,h6,p,td,pre,ul,li".toUpperCase().split(","),

  // The default number of chars an article must have in order to return a result
  // Changed to 100 from 500 to support some shitty websites
  DEFAULT_CHAR_THRESHOLD: 100,

  // All of the regular expressions in use within readability.
  // Defined up here so we don't instantiate them repeatedly in loops.
  REGEXPS: {
    // NOTE: These two regular expressions are duplicated in
    // Readability-readerable.js. Please keep both copies in sync.
    unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
    okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,
    extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
    byline: /byline|author|dateline|writtenby|p-author/i,
    replaceFonts: /<(\/?)font[^>]*>/gi,
    normalize: /\s{2,}/g,
    videos: /\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,
    shareElements: /(\b|_)(share|sharedaddy)(\b|_)/i,
    nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
    prevLink: /(prev|earl|old|new|<|«)/i,
    whitespace: /^\s*$/,
    hasContent: /\S$/,
    srcsetUrl: /(\S+)(\s+[\d.]+[xw])?(\s*(?:,|$))/g,
    b64DataUrl: /^data:\s*([^\s;,]+)\s*;\s*base64\s*,/i
  }
},

  init: function() {
    var anchor = document.getElementById('CAM-Extension-Anchor');



    if (!anchor) {
      var div = document.createElement("div");
      var innerText = this.getInnerHTML();
      div.id = "CAM-Extension-Anchor";
      div.innerHTML = innerText;

      div.style.fontSize = "10px";
      div.style.width = "70%";
      div.style.margin = "0 auto";
      div.style.height = "200px";
      div.style.overflowY = "scroll";
      document.body.appendChild(div);
      // document.body.style.border = "15px solid #fefefe";
    }


  },

	getInnerHTML: function() {
		var documentClone, scripts, html;
		var elementsToGetRidOf = [
			'script',
			'iframe',
			'img',
			'noscript'
		];

		documentClone = document.cloneNode(true);

		// Caution: Do this only after page load
		// remove all script tags
		// https://stackoverflow.com/a/6660151/8887445

		
		elementsToGetRidOf.forEach(function(elementsToGetRidOfName, index, elementsToGetRidOfArray) {
			var elements = documentClone.body.getElementsByTagName(elementsToGetRidOfName);
			elements.forEach(function(element, index, elementsArray) {
				element.parentNode.removeChild(element);
			});		
		});
		

		

		// https://stackoverflow.com/a/6660315/8887445
		html = documentClone.body.innerHTML
			.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
			.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
			.replace(/<img\b[^<]*(?:(?!<\/img>)<[^<]*)*<\/img>/gi, '')
			.replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, '');





		// return document.body.innerText;
		return html;
		
	},

  Readability: {
    parse: __Parse
  },

  defineProperty: function(args) {
    const propName = args.propName;
    Object.defineProperty(HTMLCollection.prototype, propName, {
      value: function() {
        return Array.prototype.slice.call(this, 0);
      },
      writable: true,
      configurable: true
    });

  }

};




__MASTER__.init();




// sample:
// http://www.cpu-upgrade.com/CPUs/AMD/index.html

function cellOrganizer(cell, index, cellArray) {

}

function rowOrganizer(row, index, rowArray) {
  //table.rows[0].cells[0].innerText();

  if (index == 0) {

  } else {
    row.cells.forEach(cellOrganizer);
  }

}

function tableOrganizer(table, index, tableArray) {
  var className = table.className;
  var id = table.id;

  var baseId = window.btoa(className + id);
  __MASTER__[baseId] = {};
  table.rows.forEach(rowOrganizer);
}


__MASTER__.tables = document.getElementsByTagName('table');
__MASTER__.tables.forEach(tableOrganizer);



function imageOrganizer(img, index, imageArray) {
  if (img.hasAttributeNS('', 'srcset')) {
    __MASTER__.largeImages = img.srcset.split(",")
  }
}

__MASTER__.images = document.getElementsByTagName('img');
__MASTER__.images.forEach(imageOrganizer);



function() __Parse {
  return {
title: document.title,
referrer: document.referrer,
baseURI: document.baseURI,

}

}




Object.freeze(__MASTER__);
