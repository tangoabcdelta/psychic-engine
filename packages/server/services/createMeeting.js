const process = require("process");
const { env } = require("process");

const appName = "google-meets";
const createMeetings = (req, res, next) => {
  new Promise((resolve, reject) => {
    const startDate = new Date().toISOString(); //New DateTime String

    console.log(`creating a new event with conferencing`);
    const createRequest = createEvent({
      calendarId: "primary",
      resource: eventDetails,
      conferenceDataVersion: 1,
    });

    console.log(`executing the request to create a new event in ${appName}`);
    createRequest.execute((event) => {
      console.log(`Note: The event ${appName} may not exist yet`);
      // TODO: include logic to handle hangout status = pending
      console.log(`Include logic here to handle ${appName} status`);

      if (event.error) {
        reject(event.errors);
        res.redirect(req.referrer);
      }
      console.log(`setting ${appName} link from the event`);
      resolve(event.hangoutLink);

      console.log(`if we are in the test room, don't delete the event`);
      if (useUrlParams("/room/cr-1234")) return;

      console.log(`delete the event, leave no traces`);
      const deleteRequest = deleteEvent({
        calendarId: "primary",
        eventId: event.id,
        sendUpdates: "none",
      });
      deleteRequest.execute();
    });
  });
};

export default createMeetings;

const auth = (req, res, next) => {
  console.clear();
  console.dir("req");
  console.dir(req);
  const cookies = cookieParser(req);

  const {
    headers: { cookie },
  } = req;

  let b64Encoded = Buffer.from(
    JSON.stringify({
      TOKEN_SECRET,
      "something-else": "a secret",
      "rad-nom-numbar": Math.random(),
      "my-neim": "Big Fat Software",
      "my-cussword": "password",
      iat: +new Date(),
    })
  ).toString("base64");

  const hmac = createHmac("sha256", b64Encoded);

  res.cookie("auth", {
    maxAge: 900000,
    httpOnly: true,
  });

  // res.writeHead(200, {
  //   "Set-Cookie": "mycookie=test",
  //   "Content-Type": "text/html",
  // });
  next();

  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};

module.exports = auth;
