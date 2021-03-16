var express = require('express');
var router = express.Router();


const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library'); // npm install google-auth-library --save
const compute = google.compute('v1');


async function main() {
  // const auth = new google.auth.GoogleAuth({
  // ..obsolete


  const auth = new GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: ['https://www.googleapis.com/auth/compute']
  });

  const authClient = await auth.getClient();

  const project = await auth.getProjectId();

  const res = await compute.zones.list({
    project,
    auth: authClient
  });


  console.log(res.data);
}



router.get('/', function (req, res, next) {
    main().catch(console.error);
    res.send('OK');
});

module.exports = router;
