const express = require("express");

const app = express();

/* In real life, static files are better served by a web server like Apache or NginX */
app.use("/", express.static(__dirname + "/dist"));

app.listen("8009", () => {
  console.log("http://localhost:8009");
  console.log("App started on port 8009");
});
