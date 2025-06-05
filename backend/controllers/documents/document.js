const documentModel = require("./../../models/document/document");
const User = require("./../../models/user"); // ✅ بدون این خط populate کار نمی‌کنه

const s3Client = require("./../../utils/s3");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const uploadFileToLiara = async (file, fieldname, folder = "uploads") => {
  const params = {
    Body: file.buffer,
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: `${folder}/${Date.now()}-${fieldname}.${
      file.originalname.split(".")[1]
    }`,
  };

  try {
    const res = await s3Client.send(new PutObjectCommand(params));

    return { success: true };
  } catch (error) {
    console.log(error);

    return { success: false };
  }
};

const uploadSingle = async (req, res) => {
  const files = req.files;

  for (const doc in files) {
    await uploadFileToLiara(files[doc][0], doc, `/documents/${req.user._id}`);
  }

  return res.send({
    status: "success",
    message: "file uploaded!",
  });
};

const downloadFile = async (req, res) => {
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: "CUP.png",
  };

  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3Client, command);
  console.log(url);

  return res.status(200).json({ msg: "downloading", url });
};

const userDocuments = async (req, res) => {
  const allDocuments = await documentModel
    .find({ userId: "6825b0201d772a3991a033ce" })
    .populate("userId");

  return res.status(200).json({ msg: "i am fucking fine", allDocuments });
};

module.exports = { uploadSingle, downloadFile, userDocuments };
