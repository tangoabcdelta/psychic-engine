const express = require("express");
const router = express.Router();
const CloudmersiveVideoApiClient = require("cloudmersive-video-api-client");
const defaultClient = CloudmersiveVideoApiClient.ApiClient.instance;

var Apikey = defaultClient.authentications["Apikey"];
Apikey.apiKey = "YOUR API KEY";

/* GET home page. */
router.get("/", (req, res, next) => {
  res.status(200).send("mp3Form");
  // next();
});

router.post("/", (req, res, next) => {
  var opts = {
    inputFile: Buffer.from(fs.readFileSync("C:\\temp\\inputfile").buffer), // File | Input file to perform the operation on.
    fileUrl: "fileUrl_example", // String | Optional; URL of an audio file being used for conversion. Use this option for files larger than 2GB.
    bitRate: 56, // Number | Optional; Specify the desired bitrate of the converted audio file in kilobytes per second (kB/s). Value may be between 48 and 1,411. By default, the optimal bitrate will be chosen automatically.
  };
  var callback = function(error, data, response) {
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully. Returned data: " + data);
    }
  };
  apiInstance.audioConvertToMp3(opts, callback);
});

module.exports = router;
