const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const {
  ListObjectsV2Command,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

require("dotenv").config();

const s3Client = require("./utils/s3");
const dbConnect = require("./config/db");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:81",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

dbConnect(process.env.MongoURI);

const userModel = require("./models/user");

app.get("/", (req, res) => {
  res.status(200).json({ msg: "ok" });
});

app.post("/api/user/add", async (req, res) => {
  console.log(req.body);

  const newUser = await userModel.create(req.body);
  console.log(newUser);

  res.status(200).json({ msg: "adding new user", newUser });
});

app.post("/upload", upload.single("avatar"), (req, res) => {
  res.status(200).json({ msg: "upload thing" });
});

app.listen(4000, () => {
  console.log("server listening on port 4000");
});
