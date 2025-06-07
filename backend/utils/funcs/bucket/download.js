const s3Client = require("./../../s3");

const { GetObjectCommand } = require("@aws-sdk/client-s3");

const getFilesFromBucket = async (fileKey) => {
  const params = {
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: fileKey,
  };

  const command = new GetObjectCommand(params);
  const fileLink = await getSignedUrl(s3Client, command);

  return { fileLink };
};

module.exports = { getFilesFromBucket };
