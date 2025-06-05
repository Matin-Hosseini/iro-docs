const IdentityDocment = require("./../../models/user/identity-document");

const s3Client = require("./../../utils/s3");

const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const uploadFileToLiara = async (file, folder = "uploads") => {
  const params = {
    Body: file.buffer,
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: `${folder}/${Date.now()}-${file.fieldname}.${
      file.originalname.split(".")[1]
    }`,
  };

  try {
    const res = await s3Client.send(new PutObjectCommand(params));

    console.log(res);

    return { success: true, fileKey: params.Key };
  } catch (error) {
    return { success: false };
  }
};

const uploadIdentityDocuments = async (req, res) => {
  const { body, files } = req;

  for (const doc in files) {
    const { fileKey, success } = await uploadFileToLiara(
      files[doc][0],
      `/user-identity-documents/${req.user._id}`
    );

    if (!success)
      return res
        .status(500)
        .json({ msg: "خطایی در فرایند بارگزاری بوجود آمده است." });

    const fileBodyData = JSON.parse(body[`${doc}_data`]);

    await IdentityDocment.create({
      userId: req.user._id,
      type: fileBodyData.fieldname,
      title: fileBodyData.label,
      order: fileBodyData.order,
      fileKey,
    });
  }

  return res.status(200).send({
    msg: "مدارک هویتی با موفقیت بارگزاری شد.",
  });
};

module.exports = { uploadIdentityDocuments };
