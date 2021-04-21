// const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createHmac } = crypto;
const cookieParser = require("cookie-parser");
const TOKEN_SECRET = `LIKE____________WHO_GIVES_A_SHIT?`;

const auth = (request, response, next) => {
  console.clear();
  console.dir("req");
  console.dir(request);
  // console.dir("res");
  // console.dir(res);
  // console.log("res", next);
  cookieParser;

  const {
    headers: { cookie },
  } = request;

  const hmac = createHmac("sha256", {
    TOKEN_SECRET,
    "something-else": "a secret",
    "rad-nom-numbar": Math.random(),
    "my-neim": "Big Fat Software",
    "my-cussword": "password",
    iat: +new Date(),
  });

  response.cookie("auth", { maxAge: 900000, httpOnly: true });

  // response.writeHead(200, {
  //   "Set-Cookie": "mycookie=test",
  //   "Content-Type": "text/html",
  // });
  next();
};

module.exports = auth;
