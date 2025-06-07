const s3Client = require("./../../s3");

const { PutObjectCommand } = require("@aws-sdk/client-s3");

const uploadFileToBucket = async (file, folder = "uploads") => {
  const params = {
    Body: file.buffer,
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: `${folder}/${Date.now()}-${file.fieldname}.${
      file.originalname.split(".")[1]
    }`,
  };

  try {
    const res = await s3Client.send(new PutObjectCommand(params));

    return { success: true, fileKey: params.Key };
  } catch (error) {
    return { success: false };
  }
};

module.exports = { uploadFileToBucket };
