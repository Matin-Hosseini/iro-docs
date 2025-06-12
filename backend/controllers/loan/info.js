const UserModel = require("./../../models/user");
const LoanRequestModel = require("./../../models/loan/loan-request");
const LoanDocumentModel = require("./../../models/loan/loan-document");
const { getFilesFromBucket } = require("../../utils/funcs/bucket/download");
const IdentityDocumentModel = require("./../../models/user/identity-document");

const getLoanInfo = async (req, res) => {
  const { user, params } = req;

  const targetLoan = await LoanRequestModel.findOne({
    tracking_code: params.tracking_code,
  });

  if (!targetLoan) return res.status(404).json({ msg: "تسهیلات یافت نشد." });

  const identityDocumentsData = await IdentityDocumentModel.find({
    userId: user._id,
  });

  let identityDocuments = [];

  for (let document of identityDocumentsData) {
    const { fileLink } = await getFilesFromBucket(document.fileKey);

    identityDocuments.push({
      ...document._doc,
      userId: undefined,
      fileLink,
      fileKey: undefined,
      __v: undefined,
    });
  }

  const loanDocuments = await LoanDocumentModel.find({
    loanId: targetLoan._id,
  });

  let documents = [];

  for (let document of loanDocuments) {
    const { fileLink } = await getFilesFromBucket(document.fileKey);

    documents.push({
      ...document._doc,
      loanId: undefined,
      fileLink,
      fileKey: undefined,
      __v: undefined,
    });
  }

  return res.status(200).json({
    msg: "تسهیلات دریافت شد.",
    loan: targetLoan,
    loanDocuments: documents,
    identityDocuments,
  });
};

module.exports = { getLoanInfo };
