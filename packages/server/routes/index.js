const express = require("express");
const { FOO, tailwindcss } = require("@bigfatsoftware/fashion");
const { Header, Main } = require("@bigfatsoftware/components");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", {
    title: "Snap",
    FOO,
    tailwindcss,
    Header,
    Main,
  });
  // next();
});

module.exports = router;
