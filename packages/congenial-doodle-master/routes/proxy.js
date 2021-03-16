const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('proxy', {
    title: 'PPPPRRR',
    contextTitle: '',
    proxyHTML: ''
  });
});



router.post('/', async (req, res, next) => {
  const { body: { url } } = req;
  console.log(url);
  try {
    const browser = await puppeteer.launch({
      headless: true
    });
    let page = await browser.newPage();
    await page.setViewport({
      width: 1338,
      height: 768,
      deviceScaleFactor: 3
    });
    await page.goto(url, { waitUntil: 'domcontentloaded' }); //domcontentloaded | networkidle0
    await page.waitForSelector('body');
    let html = await page.$eval('html', e => e.outerHTML);
    await browser.close();
    removeTagsAndRender(html, { log: true });
    res.render('proxy', {
      title: 'PPPPRRR',
      contextTitle: '',
      proxyHTML: html
    });

  }
  catch(error) {
    console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`);
    res.render('proxy', {
      title: 'PPPPRRR',
      contextTitle: '',
      proxyHTML: error
    });
    console.log(error);
  }
  console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`); 
});


function removeTagsAndRender(markup, options) {
  // removes unwanted tags from html
  // need to improve this logic
  // or use a better 3rd party lib to trim the head and body
  // ps: i sound like a murderer in my previous sentence
  
  let html = markup;
  html = html.replace('<!DOCTYPE html>', '')
  html = html.replace('<html', '<div class="foo00000000000000000"')
  html = html.replace('<body', '<div class="barrrrrrrrrrrrrrrrrrrrr"')
  html = html.replace('</body>', '</div>')
  html = html.replace('</html>', '</div>');
  
  // log only if the logging is set to true in options
  // alternatively (and ideally) we should check for the environment variable
  // or debug levels to log information
  // but, this, for now, is the easiest
  options.log && console.log(`html.replace.body`);
  options.log && console.log(`html.indexOf.DOCTYPE: ${html.indexOf('DOCTYPE')}`);
  options.log && console.log(`html.indexOf.html: ${html.indexOf('<html')}`);
  options.log && console.log(`html.indexOf.body: ${html.indexOf('<body')}`);
  options.log && console.log(`html: \n ${html}`);
  

  return html;
}




// read a file locally just to test
router.put('/', async (req, res, next) => {
  const filePath = path.join(__dirname, '../sample responses/demo.firefox.html');
  const options = {
      encoding: 'utf8',
      flag:'r'
  };
  try {
    let html = await fs.readFileSync(filePath, options);
    

    html = removeTagsAndRender(html, {
      log: true
    });
    res.render('proxy', {
      title: 'PPPPRRR',
      contextTitle: '',
      proxyHTML: html
    });
  }
  catch(error) {
    console.log(`error: ${error}`);
  }
  console.log(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`); 

})

module.exports = router;
