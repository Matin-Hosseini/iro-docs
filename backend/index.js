const express = require("express");
const dbConnect = require("./config/db");

const cors = require("cors");
const {
  ListObjectsV2Command,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

require("dotenv").config();
const s3Client = require("./utils/s3");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:81",
    credentials: true,
  })
);

dbConnect(process.env.MongoURI);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "ok" });
});

const getData = async () => {
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: "1-Introduction-CN.pdf",
  };

  try {
    const data = await s3Client.send(new ListObjectsV2Command(params));
    const files = data.Contents.map((file) => file.Key);
    console.log(files);
  } catch (error) {
    console.log(error);
  }

  try {
    const data = await s3Client.send(new GetObjectCommand(params));
    console.log(data.Body.toString());
  } catch (error) {
    console.log(error);
  }

  const command = new GetObjectCommand(params);
  getSignedUrl(s3Client, command).then((url) => console.log(url));
};

app.listen(4000, () => {
  console.log("server listening on port 4000");
});
