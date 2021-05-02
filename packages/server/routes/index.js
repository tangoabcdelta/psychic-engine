const express = require("express");
const process = require("process");
const { FOO, tailwindcss } = require("@bigfatsoftware/fashion");
const { Header, Main } = require("@bigfatsoftware/components");

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
    case "http://cars.biribadi.com/":
      // a = "cars";
      a = "index";
      b = {
        ...info,
        title: "Cars - BiriBadi.com",
        show: "cars",
      };
      break;

    case "localhost:4000":
    default:
      a = "index";
      b = {
        ...info,
        title: "Localhost / Default - BiriBadi.com",
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
