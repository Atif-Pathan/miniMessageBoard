// app.js
const express = require("express");
const path = require("node:path");

const app = express();
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/index.js");

app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});