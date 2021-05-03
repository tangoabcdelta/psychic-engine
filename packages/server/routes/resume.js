const express = require("express");
const path = require("path");
const { readFileSync } = require("fs");
const ejs = require("ejs");
// const { FOO, tailwindcss } = require("@bigfatsoftware/fashion");
// const { Header, Main } = require("@bigfatsoftware/components");

const FOO = "bar";
const tailwindcss = "000";

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

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", {
    title: "Express",
    FOO,
    tailwindcss,
    Header,
    Main,
  });
  // next();
});

module.exports = router;
