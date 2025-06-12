const { getFilesFromBucket } = require("../../utils/funcs/bucket/download");
const { uploadFileToBucket } = require("../../utils/funcs/bucket/upload");
const IdentityDocment = require("./../../models/user/identity-document");

const uploadIdentityDocuments = async (req, res) => {
  const { body, files } = req;

  for (const doc in files) {
    const { fileKey, success } = await uploadFileToBucket(
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

const getIdentityDocuments = async (req, res) => {
  const { user } = req;

  const userIdentityDocuments = await IdentityDocment.find({
    userId: user._id,
  });

  if (!userIdentityDocuments)
    return res.status(200).json({ msg: "ok", documents: [] });

  const documents = [];

  for (doc of userIdentityDocuments) {
    const { fileLink } = await getFilesFromBucket(doc.fileKey);

    documents.push({
      _id: doc._id,
      type: doc.type,
      title: doc.title,
      fileLink,
      status: doc.status,
      order: doc.order,
      rejectionReason: doc.rejectionReason,
      reviewedBy: doc.reviewedBy,
      reviewedAt: doc.reviewedAt,
      uploadedAt: doc.uploadedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  const sortedDocs = documents.sort((a, b) => a.order - b.order);

  res.status(200).json({ msg: "ok", documents: sortedDocs });
};

const changeIdentityDocumentStatus = async (req, res) => {
  const { params, body } = req;

  console.log(params, body);

  const targetDocument = await IdentityDocment.findOne({ _id: params.id });

  if (!targetDocument) return res.status(404).json({ msg: "سند یافت نشد." });

  targetDocument.status = body.status;

  await targetDocument.save();

  console.log(targetDocument);

  return res.status(200).json({ msg: "تغییر اعمال شد." });
};

module.exports = {
  uploadIdentityDocuments,
  getIdentityDocuments,
  changeIdentityDocumentStatus,
};
