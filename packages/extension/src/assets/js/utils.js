((window) => {
  //
  // URL Matching test - to verify we can talk to this URL
  //

  let SCREENSHOT_MODE = !1;

  const noop = () => {
    "do nothing";
  };

  const dcl = noop;
  const storageLocal = {
    load: noop,
    save: noop,
  };

  const DEVELOPMENT_MODE = !("update_url" in chrome.runtime.getManifest());
  const SKIP_RESTORE_HASH_CHECK = !(
    "update_url" in chrome.runtime.getManifest()
  );
  const SCREENSHOT_MODE_QUERY = "?screenshot=on";
  const SCREENSHOT_WAIT = 50;
  const SCREENSHOT_INSTRUCTIONS_READ_DEFAULT = !1;
  const SCROLLBAR_WIDTH = "12";
  const BADGE_DISPLAY_DEFAULT = !0;
  const INTERVAL_UPDATE_S = 1;
  const INTERVAL_UPDATE_MS = 1e3;
  const INTERVAL_SAVE_MS = 6e4;
  const INTERVAL_UI_LOADING = 2e3;
  const UI_LOADING_BLINKING_INTERVAL = 600;
  const UI_LOADING_BLINKING_COUNT = 3;
  const IDLE_TIME_DEFAULT = 30;
  const RESOLUTION_HOURS = "h";
  const RESOLUTION_DAYS = "d";
  const TIME_UNIT_DAY = "d";
  const TIME_UNIT_HOUR = "h";
  const TIME_UNIT_MINUTE = "m";
  const TIME_UNIT_SECOND = "s";
  const RANGE_TODAY = "today";
  const RANGE_AVERAGE = "average";
  const RANGE_ALLTIME = "alltime";
  const GRAPH_SIZE = 240;
  const GRAPH_COLOR_OTHER = "hsl(0, 0%, 50%)";
  const GRAPH_MIN_PERCENTAGE_TO_INCLUDE = 1.5;
  const GRAPH_GAP_DEFAULT = 0.4;
  const CHART_STATS_STEP_HEIGHT_MIN = 1;
  const CHART_STATS_HEIGHT_DAYS = 60;
  const CHART_STATS_HEIGHT_DAYNAMES = 60;
  const BLACKLIST_DOMAIN = [];
  const BLACKLIST_PROTOCOL = ["chrome:", "chrome-extension:"];
  const IDLE_TIME_TABLE = [
    15,
    30,
    45,
    60,
    90,
    120,
    180,
    240,
    300,
    600,
    900,
    1200,
    1500,
    1800,
    2100,
    2400,
    2700,
    3e3,
    3300,
    3600,
    7200,
  ];
  const GRAPH_GAP_TABLE = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

  const STORAGE_DOMAINS = "domains";
  const STORAGE_DATE_START = "date-start";
  const STORAGE_SECONDS_ALLTIME = "seconds-alltime";
  const STORAGE_IDLE_TIME = "idle-time";
  const STORAGE_GRAPH_GAP = "graph-gap";
  const STORAGE_BADGE_DISPLAY = "badge-display";
  const STORAGE_SCREENSHOT_INSTRUCTIONS_READ = "storage-instructions-read";

  const matches = ["http://*/*", "https://*/*", "ftp://*/*", "file://*/*"];
  const nonmatches = [/^https?:\/\/chrome.google.com\/.*$/];
  const extensionURLPattern = /^https?:\/\/chrome.google.com\/webstore\/.+?\/([a-z]{32})(?=[\/#?]|$)/;

  const domains = {};
  const dates = { today: getDateString(), start: "" };
  const seconds = { today: 0, alltime: 0 };
  const timeIntervals = { update: 0, save: 0 };
  const settings = {
    idleTime: IDLE_TIME_DEFAULT,
    graphGap: GRAPH_GAP_DEFAULT,
    badgeDisplay: BADGE_DISPLAY_DEFAULT,
    screenshotInstructionsRead: SCREENSHOT_INSTRUCTIONS_READ_DEFAULT,
  };
  const domainsChanged = false;

  const isInPopUp = () => {
    if (window.location.search.indexOf("?popup") > -1) {
      window.inPopup = true;
    } else {
      window.inPopup = false;
    }
    if (window.location.search.indexOf("?panel") > -1) {
      window.inPanel = true;
    } else {
      window.inPanel = false;
    }
  };

  const isValidUrl = (url) => {
    // testing against known urls
    const nonmatch = nonmatches.filter((pattern) => {
      return pattern.test(url);
    });

    const match = matches.filter((pattern) => {
      return new RegExp(`^${pattern.replace(/\*/g, ".*")}$`).test(url);
    });

    return !(nonmatch && nonmatch.length > 0) || match.length > 0;
  };
  const getChromeVersion = () => {
    let pieces = navigator.userAgent.match(
      /Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/
    );
    if (pieces == null || pieces.length != 5) {
      return undefined;
    }
    pieces = pieces.map((piece) => parseInt(piece, 10));
    return {
      major: pieces[1],
      minor: pieces[2],
      build: pieces[3],
      patch: pieces[4],
    };
  };

  const getCurrentChromeVersion = () => {
    const [major, minor, build, patch] = getChromeVersion();
    return `${major}.${minor}.${build}.${patch}`;
  };

  const converToZip = (arrayBuffer, callback) => {
    let buffer = new Uint8Array(arrayBuffer);
    let zipStartOffset = 12 + publicKeyLength;
    const header = 16;
    if (buffer[4] === 2) {
      const publicKeyLength =
        0 + buf[8] + (buf[9] << 8) + (buf[10] << 16) + (buf[11] << 24);
      zipStartOffset = header + publicKeyLength + signatureLength;
    } else {
      zipStartOffset = 12 + publicKeyLength;
    }

    var zipFragment = new Blob([new Uint8Array(arraybuffer, zipStartOffset)], {
      type: "application/zip",
    });
  };

  const getURL = (url, callback, errCallback, xhrProgressListener) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.onprogress = xhrProgressListener;
    xhr.onload = () => {
      callback.call(xhr);
    };
    xhr.onerror = () => {
      errCallback.call(xhr);
    };
    xhr.send();
  };

  const captureScreen = (tab, callback) => {
    chrome.tabs.sendMessage(tab.id, { msg: "scrollPage" }, () => {
      // this will be called when we've finished capturing
      // snapshots of all parts of the window
      // upon completion, we will display the resulting full
      // screenshot image in a new browser tab.
      // we will use the callback to do that
      callback();
    });
  };

  const capture = (data, screenshots, sendResponse, splitNotifier) => {};

  const getAllSessions = () => {
    // Assuming you declared tabs permission in manifest, there are several problems with this code:
    // list_session() function will return empty list because you modify the list in a callback function,
    // which could be called by chrome 15 minutes after your console.log(list); and return. You need to change your program structure to use callbacks instead.
    // concat method does not modify original array
    // in operator is not recommended to use to loop through an array as it might return not what you expect.
  };
  // })();

  // (function() {

  function loadDomains(a) {
    storageLocal.load("domains", {}, (e) => {
      a(e), dcl(`Domains loaded: ${Object.keys(domains).length} domains`);
    });
  }

  function saveDomains() {
    storageLocal.save("domains", domains, () => {
      (domainsChanged = !1),
        dcl(`Domains saved: ${Object.keys(domains).length} domains`);
    });
  }

  function clearAllGeneratedData() {
    (domains = {}),
      saveDomains(),
      (seconds.today = 0),
      (seconds.alltime = 0),
      saveSecondsAlltime(),
      (dates.start = dates.today),
      saveDateStart(),
      dcl("Clear all generated data: done");
  }

  function loadDateStart(a) {
    storageLocal.load("date-start", a, (a) => {
      (dates.start = a["date-start"]),
        saveDateStart(),
        dcl(`Start date loaded: ${a["date-start"]}`);
    });
  }

  function saveDateStart() {
    storageLocal.save("date-start", dates.start, () => {
      dcl(`Start date saved: ${dates.start}`);
    });
  }

  function loadSecondsAlltime() {
    storageLocal.load("seconds-alltime", 0, (a) => {
      (seconds.alltime = a["seconds-alltime"]),
        saveSecondsAlltime(),
        dcl("Seconds alltime loaded: " + a["seconds-alltime"]);
    });
  }

  function saveSecondsAlltime() {
    storageLocal.save("seconds-alltime", seconds.alltime, () => {
      dcl(`Seconds alltime saved: ${seconds.alltime}`);
    });
  }

  function loadIdleTime() {
    storageLocal.load("idle-time", IDLE_TIME_DEFAULT, (a) => {
      (settings.idleTime = a["idle-time"]),
        saveIdleTime(),
        dcl(`Idle time loaded: ${a["idle-time"]}`);
    });
  }

  function saveIdleTime() {
    storageLocal.save("idle-time", settings.idleTime, () => {
      dcl(`Idle time saved: ${settings.idleTime}`);
    });
  }

  function setIdleTime(a) {
    settings.idleTime = parseInt(a) || IDLE_TIME_DEFAULT;
  }

  function loadGraphGap() {
    storageLocal.load("graph-gap", GRAPH_GAP_DEFAULT, (a) => {
      (settings.graphGap = a["graph-gap"]),
        saveGraphGap(),
        dcl(`Graph gap loaded: ${a["graph-gap"]}`);
    });
  }

  function saveGraphGap() {
    storageLocal.save("graph-gap", settings.graphGap, () => {
      dcl(`Graph gap saved: ${settings.graphGap}`);
    });
  }

  function setGraphGap(a) {
    let e = parseFloat(a);
    settings.graphGap = isFinite(e) ? e : GRAPH_GAP_DEFAULT;
  }

  function loadBadgeDisplay() {
    storageLocal.load("badge-display", BADGE_DISPLAY_DEFAULT, (a) => {
      (settings.badgeDisplay = a["badge-display"]),
        saveBadgeDisplay(),
        dcl(`Badge display loaded: ${a["badge-display"]}`);
    });
  }

  function saveBadgeDisplay() {
    storageLocal.save("badge-display", settings.badgeDisplay, () => {
      dcl(`Badge display saved: ${settings.badgeDisplay}`);
    });
  }

  function setBadgeDisplay(a) {
    settings.badgeDisplay = "boolean" == typeof a ? a : BADGE_DISPLAY_DEFAULT;
  }

  function loadScreenshotInstructionsRead() {
    storageLocal.load(
      "storage-instructions-read",
      SCREENSHOT_INSTRUCTIONS_READ_DEFAULT,
      (a) => {
        (settings.screenshotInstructionsRead = a["storage-instructions-read"]),
          saveScreenshotInstructionsRead(),
          dcl(
            `Storage instructions set loaded: ${a["storage-instructions-read"]}`
          );
      }
    );
  }

  function saveScreenshotInstructionsRead() {
    storageLocal.save(
      "storage-instructions-read",
      settings.screenshotInstructionsRead,
      () => {
        dcl(
          `Storage instructions set saved: ${settings.screenshotInstructionsRead}`
        );
      }
    );
  }

  function setScreenshotInstructionsRead(a) {
    settings.screenshotInstructionsRead =
      "boolean" == typeof a ? a : SCREENSHOT_INSTRUCTIONS_READ_DEFAULT;
  }

  function setBadge(a, e) {
    settings.badgeDisplay || (e = ""),
      chrome.browserAction.setBadgeText({ tabId: a, text: e });
  }

  function updateDomains(a) {
    let e,
      t,
      s,
      d = getDateString();
    dates.today !== d && ((dates.today = d), (seconds.today = 0)),
      chrome.windows.getLastFocused({ populate: !0 }, (d) => {
        for (let a in d.tabs)
          if (d.tabs.hasOwnProperty(a) && !0 === d.tabs[a].active) {
            s = d.tabs[a];
            break;
          }
        chrome.idle.queryState(settings.idleTime, (o) => {
          d.id, d.focused;
          let n = s.id;
          s.url;
          if (
            // ((e = parseDomainFromUrl(s.url)),
            (t = parseProtocolFromUrl(s.url)),
            ((d.focused && "active" === o) || a) &&
              -1 === BLACKLIST_DOMAIN.indexOf(e) &&
              -1 === BLACKLIST_PROTOCOL.indexOf(t) &&
              "" !== e)
          ) {
            dcl("LOG (" + dates.today + "): " + e),
              domains.hasOwnProperty(e) ||
                ((domains[e] = getDomainObj()), (domains[e].name = e));
            let t = domains[e];
            (t.days[dates.today] = t.days[dates.today] || getDayObj()),
              a ||
                ((t.alltime.seconds += INTERVAL_UPDATE_S),
                (t.days[dates.today].seconds += INTERVAL_UPDATE_S),
                (seconds.today += INTERVAL_UPDATE_S),
                (seconds.alltime += INTERVAL_UPDATE_S),
                (domainsChanged = !0)),
              setBadge(n, getBadgeTimeString(t.days[dates.today].seconds));
          }
        });
      });
  }

  const onActivatedListener = (a) => {
    let e,
      t = a.tabId;
    chrome.tabs.get(t, (a) => {
      e = parseDomainFromUrl(a.url);
      setBadge(t, "");
      domains[e] &&
        domains[e].days[dates.today] &&
        setBadge(t, getBadgeTimeString(domains[e].days[dates.today].seconds));
    });
  };

  chrome.tabs.onActivated.addListener(onActivatedListener);

  dcl("Webtime Tracker - background.js loaded");
  loadDateStart(dates.today);
  loadSecondsAlltime();
  loadIdleTime();
  loadGraphGap();
  loadBadgeDisplay();
  loadScreenshotInstructionsRead();
  loadDomains((a) => {
    domains = a.domains || [];
    seconds.today = getTotalSecondsForDate(domains, getDateString());
  });

  // use window.requestAnimationFrame
  timeIntervals.update = window.setInterval(() => {
    updateDomains();
  }, INTERVAL_UPDATE_MS);
  timeIntervals.save = window.setInterval(() => {
    domainsChanged &&
      (saveDomains(),
      saveSecondsAlltime(),
      chrome.storage.local.getBytesInUse(null, (a) => {
        dcl("Total storage used: " + a + " B");
      }));
  }, INTERVAL_SAVE_MS);

  function getDateString() {}

  const getGreetingTime = (m) => {
    var g = null; //return g

    if (!m || !m.isValid()) {
      return;
    } //if we can't find a valid or filled moment, we return.

    var split_afternoon = 12; //24hr time to split the afternoon
    var split_evening = 17; //24hr time to split the evening
    var currentHour = parseFloat(m.format("HH"));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      g = "afternoon";
    } else if (currentHour >= split_evening) {
      g = "evening";
    } else {
      g = "morning";
    }

    return g;
  };

  const getCurrentTime = () => {
    const m = moment();
    const { format } = m;
    const d = {
      m,
      day: format("dddd"),
      date: format("MMMM Do YYYY"),
      hours: format("h:mm:ss a"),
    };
  };

  window.UTILS = {
    getGreetingTime,
    getCurrentTime,
  };
})(window);
