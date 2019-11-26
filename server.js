// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const port = process.env.PORT || 8080;
const cors = require("cors");

app.set("port", (process.env.PORT || 5000));

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "/index.html")));
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC

app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(bodyParser.urlencoded({extended: true}));

// your first API endpoint...

app.get("/api/timestamp/", function(req, res) {
  res.json({unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date_string", function(req, res) {
  const dateString = req.params.date_string;
  if (/\d{5,}/.test(dateString)) {
    const dateInt = parseInt(dateString);
    res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
}

  const dateObject = new Date(dateString);

  if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
      } else {
        res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTString() });
      }
});

// listen for requests :)
app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});
