const fs = require("fs");
const path = require("path");
const { readFileSync } = fs;

const Header = {
  markup: readFileSync(path.resolve(__dirname, "./Header.html")),
  css: readFileSync(path.resolve(__dirname, "./Header.css")),
};

const Main = {
  markup: readFileSync(path.resolve(__dirname, "./Main.html")),
  css: readFileSync(path.resolve(__dirname, "./Main.css")),
};

const hello = () => {
  console.log("hello: form componets");
};

const text = "some text from common";

const COMPONENTS = {
  hello,
  text,
  Header,
  Main,
};

module.exports = COMPONENTS;
