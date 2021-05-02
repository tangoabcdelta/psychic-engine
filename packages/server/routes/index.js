const express = require("express");
const process = require("process");
const path = require("path");
const { readFileSync } = require("fs");
const ejs = require("ejs");
// const { FOO, tailwindcss } = require("@bigfatsoftware/fashion");
const FOO = "bar";
const tailwindcss = "000";

// const { Header, Main } = require("@bigfatsoftware/components");
const Header = {
  markup: readFileSync(
    path.resolve(__dirname, "../views/partials/generic/Header.html")
  ), //ejs.compile(
  css: "",
};

const Main = {
  markup: readFileSync(
    path.resolve(__dirname, "../views/partials/generic/Main.html")
  ), // ejs.compile(
  css: "",
};

// `/home/deveedutta/Documents/Projects/psychic-engine/packages/server/routes/views/partials/generic/Header.html`;
// `/home/deveedutta/Documents/Projects/psychic-engine/packages/server/views/partials/generic/Header.html`;

const router = express.Router();
const IS_PROD = false;
let IS_LOGGED_IN = false;

/* GET home page. */
router.get("/", (req, res, next) => {
  console.log("-------------------------------------------------------------");
  let {
    headers: { host },
  } = req;
  // console.dir(req.headers);
  console.log("host", host);
  console.log("-------------------------------------------------------------");

  let info = {
    title: "BiriBadi.com",
    show: "default",
    FOO,
    tailwindcss,
    Header,
    Main,
    options: {
      IS_LOGGED_IN,
      url: `${IS_PROD ? "wss" : "ws"}://localhost:${parseInt(
        process.env.PORT,
        10
      ) + 1}`,
    },
  };

  let a;
  let b;
  switch (host) {
    case "cars.localhost:4000":
    case "cars.biribadi.com":
      // a = "cars";
      a = "index";
      b = {
        ...info,
        title: "Cars",
        domain: "BiriBadi.com",
        show: "cars",
      };
      break;

    case "biribadi.com":
    case "localhost:4000":
    default:
      a = "index";
      b = {
        ...info,
        title: "Localhost / Default",
        domain: "BiriBadi.com",
        show: "default",
      };
      break;
  }

  res.render(a, b);
  // next();
});

router.post("/", (req, res, next) => {
  IS_LOGGED_IN = true;
  // res
  //   .status(200)
  //   .location("/")
  //   .end();

  console.log("req.body.username", req.body.username);
  console.log("req.body.password", req.body.password);
  console.log("req.body.action", req.body.action);
  console.log("req.body.submit", req.body.submit);
  console.log("req.body.username", req.body.username);

  res.status(200).redirect("/")();
  // res.redirect(200, "/");

  // , {
  //   title: "Snap",
  //   FOO,
  //   tailwindcss,
  //   Header,
  //   Main,
  //   options: {
  //     url: `${IS_PROD ? "wss" : "ws"}://localhost:${parseInt(
  //       process.env.PORT,
  //       10
  //     ) + 1}`,
  //   },
  // });
});

module.exports = router;
