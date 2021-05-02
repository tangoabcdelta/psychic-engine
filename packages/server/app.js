const createError = require("http-errors");
const express = require("express");
const path = require("path");
const auth = require("./middleware/auth.mw");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const resumeRouter = require("./routes/resume");
const tokenRouter = require("./routes/getToken");
const mp3ServiceHandler = require("./routes/mp3ServiceHandler");

const app = express();

// view engine setup
app.engine("html", require("ejs").__express);
// alternatively use
// app.engine('html', require('ejs').renderFile);
// The only difference is that you need to specify the extension:
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(auth);
// app.use("/", auth, indexRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/resume", resumeRouter);
app.use("/bc", async (req, res) => {
  const hash = await BCrypt.hash("this is a long password", 8);
  res.send(hash);
});

app.use("mp3", mp3ServiceHandler);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  next();
});

module.exports = app;
