const puppeteer = require('puppeteer');
const blockedResourceTypes = [
  'image',
  'media',
  'font',
  'texttrack',
  'object',
  'beacon',
  'csp_report',
  'imageset'
];

const skippedResources = [
  'quantserve',
  'adzerk',
  'doubleclick',
  'adition',
  'exelator',
  'sharethrough',
  'cdn.api.twitter',
  'google-analytics',
  'googletagmanager',
  'google',
  'fontawesome',
  'facebook',
  'analytics',
  'optimizely',
  'clicktale',
  'mixpanel',
  'zedo',
  'clicksor',
  'tiqcdn',
];

const __BROWSER_WEBSOCKET_ENDPOINT__ = '';

let __CACHE__ = new Map();


async function prerender(req, res, next) {
  // const { url } = req;
  const start = Date.now();
  const url = `${req.protocol}:\/\/${req.get('host')}\/${req.url}`;
  console.log(`${url}`);
  console.log(`zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz`);


  if (__CACHE__.has(url)) {
    console.log(`__CACHE__.has(url): ${__CACHE__.has(url)}`);
    return {
      html: __CACHE__.get(url),
      ttRenderMs: 0
    };
  }

  const browser = await puppeteer.launch({
    headless: true // true | false :: headless | headful modes
    // headless: false // true | false :: headless | headful modes
  });


  try {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', request => {
      const requestUrl = request._url.split('?')[0].split('#')[0];
      if (
        blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
        skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    // https://github.com/puppeteer/puppeteer/issues/1191
    // Intercept responses via the remote interface and using 
    // `Network.getResponseBodyForInterception`
    // Interception should happen at the `HeadersReceived` stage
    // await Network.setRequestInterception({ patterns: [{ urlPattern: '*.js*', resourceType: 'Script', interceptionStage: 'HeadersReceived' }] });
    // Network.requestIntercepted(async ({ interceptionId, request, responseStatusCode, responseHeaders }) => {
    // console.log(`Intercepted ${request.url} {interception id: ${interceptionId}}`);
    // const response = await Network.getResponseBodyForInterception({ interceptionId });
    // const bodyData = response.base64Encoded ? atob(response.body) : response.body;
    // const newBody = bodyData + `\nconsole.log('Intercepted and modified ${request.url}');`;
    // const newHeaders = [
    //   'HTTP/1.1 200 OK',
    //   'Date: ' + (new Date()).toUTCString(),
    //   'Connection: closed',
    //   'Content-Length: ' + newBody.length,
    //   'Content-Type: text/javascript'
    // ];

    // Network.continueInterceptedRequest({
    //   interceptionId,
    //   rawResponse: btoa(newHeaders.join('\r\n') + '\r\n\r\n' + newBody)
    // });
    // });

    // https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#targetcreatecdpsession
    // target.createCDPSession()
    // returns: <Promise<CDPSession>>
    // Creates a Chrome Devtools Protocol session attached to the target.
    // Usage: https://github.com/puppeteer/puppeteer/issues/1191#issuecomment-459990812
    // Usage:
    // const client = await page.target().createCDPSession();
    // await client.send( 'Network.enable' );

    page.on('response', async response => {
        request.resourceType()
        if (response.request() /*Your condition check*/) {
          var buffer = await response.buffer(); /*You can get the buffer*/
          var content = await response.text(); /*You can get the content as text*/
        }
    });

    // Techiniques to wait:
    // 1st techinique
    const response = await page.goto(url, {
      timeout: 25000,
      waitUntil: 'networkidle2'
    });


    // Inject <base> on page to relative resources load properly.
    await page.evaluate(url => {
      const base = document.createElement('base');
      base.href = url;
      // Add to top of head, before all other resources.
      document.head.prepend(base);
    }, url);

    // Remove scripts and html imports. They've already executed.
    await page.evaluate(() => {
      const elements = document.querySelectorAll('script, link[rel="import"]');
      elements.forEach(e => e.remove());
    });

    // 2nd techinique
    // ensure #posts exists in the DOM.
    await page.waitForSelector('body');

    // 3rd techinique
    // TODO: Use the page.evaluate()

    const html = await page.content();
    // Close the page we opened here (not the browser).
    await page.close();


    const ttRenderMs = Date.now() - start;
    console.info(`Headless rendered page in: ${ttRenderMs}ms`);

    __CACHE__.set(url, html);
    res.foo = html;

    return {
      html,
      status: response.status(),
      ttRenderMs
    }    
  }
  catch (e) {
    console.log(`zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz`);
    console.log(`zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz`);
    console.log(`zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz`);
    console.log(`zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz`);
    await browser.close();
    const html = e.toString();
    console.warn({
      message: `URL: ${url} Failed with message: ${html}`
    })
    return {
      html,
      status: 500
    }
  }
  await browser.close();
  next();
}

module.exports = prerender;
// export { prerender as default };

