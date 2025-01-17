const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* In real life, static files are better served by a web server like Apache or NginX */
app.use("/", express.static(__dirname + "/dist"));

app.post("/answers", (req, res, next) => {
  console.log(req.body);
  res.send({
    data: "Thank you for answering !",
  });
});

app.listen("8012", () => {
  console.log("http://localhost:8012");
  console.log("App started on port 8012");
});
