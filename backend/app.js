const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

require("dotenv").config();

const app = express();
const apiRoutes = require("./routes/index");
const apiKeyMiddleWare = require("./middlewares/apiKeyMiddleware");

app.use(
  cors({
    origin: ["http://127.0.0.1:81", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "example.com"],
      },
    },
  })
);
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use("/api/v1", apiKeyMiddleWare, apiRoutes);

app.get("/", (req, res) => {
  console.log(req.body);
  res.status(200).json({ msg: "Welcom To IRO Docs" });
});

module.exports = app;
