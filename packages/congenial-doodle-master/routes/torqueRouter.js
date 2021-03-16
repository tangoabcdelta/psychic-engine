const express = require('express');
const fs = require('fs');
const router = express.Router();
const md5 = require('md5');
const process = require('process');
const puppeteer = require('puppeteer');
const firebase = require('@firebase/app').default;
const firestore = require('@firebase/firestore');
const fireauth = require('@firebase/auth');
const admin = require('firebase-admin');
var ref;
var firebaseApp;
var _serviceAccountKey;
var _firebaseConfig;
var defaultPageObject = {
  title: '🚗',
  contextTitle: ':(',
  values: [],
  askForConfig: false
};


if (process.env.serviceAccountKey) {
  // Go to:
  // https://console.firebase.google.com/../../project/<project-name>-<hash>/settings/serviceaccounts/adminsdk
  // Service Accounts Tab
  // Generate Key

  // Fetch the service account key JSON file contents
  _serviceAccountKey = JSON.parse(process.env.serviceAccountKey);
  _firebaseConfig = JSON.parse(process.env.firebaseConfig);
}

function initializeFirebase () {


  console.log(`<<initializeFirebase>>`);
  // _serviceAccountKey instanceof Object;
  // console.log(`initializeFirebase>>_serviceAccountKey: ${_serviceAccountKey}`);
  // console.log(`initializeFirebase>>_serviceAccountKey: ${_serviceAccountKey instanceof Object}`);
  // _serviceAccountKey = _serviceAccountKey instanceof Object && _serviceAccountKey || JSON.parse(_serviceAccountKey || "{}");
  // _firebaseConfig = _firebaseConfig instanceof Object && _firebaseConfig || JSON.parse(_firebaseConfig || "{}");
  _serviceAccountKey = _serviceAccountKey;
  _firebaseConfig = _firebaseConfig;
    

  // Initialize the app with a service account, granting admin privileges

  firebaseApp = firebaseApp || admin.initializeApp({
    credential: admin.credential.cert(_serviceAccountKey),
    databaseURL: "https://charlesaugustusmagnussen-cf42a.firebaseio.com"
  });

  // Need to call: setPersistence(firebase.auth.Auth.Persistence.NONE);
  console.log("Firebase DB Admin mode initialized");

  // As an admin, the app has access to read and write all data, regardless of Security Rules
  const db = admin.database();


  //ref = db.ref("public/default/articles");
  //ref = db.ref("server/saving-data/fireblog/");
  ref = db.ref("/");
}


function defaultCallback (req, res, next) {
  const db = admin.database();
  const ref = db.ref("public/torque/db/");
  const ref2 = db.ref("public/torque/direct/");
  console.clear();

  try {
    ref.orderByChild("date").limitToLast(10).once("value", (snapshot) => {
      if (snapshot.val()) {
        res.status(200).render('torqueScraper', {
          ...defaultPageObject,
          contextTitle: 'WOOOSH!!!',
          values: getValues( snapshot.val() )
        });
      } else {
        res.status(401).render('torqueScraper', {
          ...defaultPageObject,
          contextTitle: 'GRRRRRR!!!',
          values: []
        }


        );
      }
    })
  }
  catch(error) {
    console.log(error);
    browser.close();
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
};



function askForConfigCallback (req, res, next) {
  console.clear();
  res.status(200).render('torqueScraper', {
    ...defaultPageObject,
    askForConfig: true
  });
}


async function postDataToDB(req, res, next) {
  const browser = await puppeteer.launch({
    headless: true
  });
  const db = admin.database();
  console.clear();
  const { body: { url } } = req;
  const hashKey = md5(url);
  const ref = db.ref("public/torque/db/");
  // temporarily shutting this off
  // will resume once the key matching issue is sorted
  //const ref2 = db.ref("public/torque/direct/");

  try {
    ref.orderByChild("hashKey").equalTo(hashKey).once("value", async (snapshot) => {
      console.log(`snapshot obtained: ${snapshot.val()}`);
      if (snapshot.val()) {
        let val = getValues(snapshot.val());
        console.log(`val obtained: ${val}, length: ${val.length}`);
        // val = val[0];
        browser.close();
        res.status(401).render('torqueScraper', {
          ...defaultPageObject,
          contextTitle: 'BUMMER!! Already exists!',
          values: getValues( snapshot.val() )
        });
      } else {
        console.log('visiting::', url);
        let page = await browser.newPage();
        await page.setViewport({
          width: 1338,
          height: 768,
          deviceScaleFactor: 3
        });
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        let html = await page.content();// await page.$eval('html', e => e.outerHTML);
        let date = (+ new Date());
        let obj = {
          url,
          hashKey,
          html,
          date
        };

        ref.push(obj);
        // ref2.push(html);
        browser.close();
        res.status(200).render('torqueScraper', {
          ...defaultPageObject,
          contextTitle: 'saved successfully',
          values: [obj]
        });     
      }
    })
  }
  catch(error) {
    console.log(error);
    browser.close();
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
}







function getValues(val) {
  let keys = Object.keys(val);
  let values = keys.map(key => {
    return {
      url: val[key].url || '',
      hashKey: val[key].hashKey || '',
      date: val[key].date || ( + new Date() ),
      html: val[key].html
    };
  });

  console.log(`keys: ${keys}`);
  console.log(`value: ${values}`);

  return values;
}

async function download(req, res, next) {
  const db = admin.database();
  const ref = db.ref("public/torque/db/");
  const { body: { hashKey } } = req;
  console.clear();

  console.log(`hashKey: ${hashKey}`);

  try {
    ref.orderByChild("hashKey").equalTo(hashKey).once("value", (snapshot) => {
      console.log(`snapshot obtained: ${snapshot.val()}`);
      if (snapshot.val()) {
        let val = getValues(snapshot.val());
        val = val[0]; // since, firebase returns an array
        let content = val.html || 'UNABLE to download';
        console.log(`value obtained:: ${val.hashKey}`);

        // const file = fs.readFileSync(__dirname + '/upload-folder/dramaticpenguin.MOV', 'binary');
        // const file = fs.createWriteStream("file.jpg");
        // res.setHeader('Content-Length', file.length);
        // res.write(file, 'binary');
        // res.end();
        // res.status(200).render('torqueScraper', {});
         res.setHeader('Content-Length', content.length);
         res
         .status(200)
         .attachment(`${hashKey}.html`)
         .send(content)
      } else {
        res.status(401).render('torqueScraper', {
          ...defaultPageObject,
          title: `..to download the file:: ${hashKey}`,
          contextTitle: 'UNABLE',
          values: []
        });     
      }
    })
  }
  catch(error) {
    console.log(error);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
};



function receiveFirebaseConfig (req, res, next) {
  if (!firebaseApp) {
    const { body: { firebaseConfig, serviceAccountKey } } = req;
    _serviceAccountKey = JSON.parse(serviceAccountKey || "{}");
    _firebaseConfig = JSON.parse(firebaseConfig || "{}");;
    initializeFirebase();
  }
  res.redirect('/🚗/');

}


router.get('/', (req, res, next) => {
  // check 2
  if (_serviceAccountKey) {
    initializeFirebase();
    defaultCallback(req, res, next);
  } else {
    askForConfigCallback(req, res, next);
  }
});


router.post('/', postDataToDB);
router.post('/download', download);
router.post('/submit/config', receiveFirebaseConfig);



module.exports = router;
