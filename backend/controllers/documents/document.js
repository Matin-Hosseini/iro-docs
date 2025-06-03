const documentModel = require("./../../models/document/document");
const User = require("./../../models/user"); // ✅ بدون این خط populate کار نمی‌کنه

const s3Client = require("./../../utils/s3");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const uploadFileToLiara = async (file, fieldname, folder = "uploads") => {
  // const params = {
  //   Bucket: process.env.LIARA_BUCKET_NAME,
  //   Key: `${folder}/${Date.now()}-${file.originalname}`, // مسیر در S3
  //   Body: file.buffer,
  //   ContentType: file.mimetype,
  // };

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
  console.log(req.user);
  const files = req.files;

  const filePreFix = files.national_card_back[0].originalname.split(".")[1];

  const params = {
    Body: files.national_card_back[0].buffer,
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: `/documents/${req.user._id}/${files.national_card_back[0].fieldname}.${filePreFix}`,
  };

  for (const doc in files) {
    await uploadFileToLiara(files[doc][0], doc, `/documents/${req.user._id}`);
  }

  // try {
  //   const res = await s3Client.send(new PutObjectCommand(params));
  //   console.log(res);
  // } catch (error) {
  //   console.log(error);
  // }

  // const fileName = `documents/${req.file.originalname}`;

  // const params = {
  //   Body: req.file.buffer,
  //   Bucket: process.env.LIARA_BUCKET_NAME,
  //   Key: fileName,
  //   ContentType: req.file.mimetype,
  // };

  // const command = new PutObjectCommand(params);

  // const response = await s3Client.send(command);

  // console.log(response);

  // const newDocument = await documentModel.create({
  //   userId: "6825b0201d772a3991a033ce",
  //   type: "birth_certificate",
  //   title: "صفحه دوم شناسنامه",
  //   description: "",
  //   fileKey: fileName,
  // });

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
