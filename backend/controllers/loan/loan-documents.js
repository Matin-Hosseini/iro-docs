const { uploadFileToBucket } = require("../../utils/funcs/bucket/upload");
const LoanRequestModel = require("./../../models/loan/loan-request");
const LoanDocumentModel = require("./../../models/loan/loan-document");

const uploadLoanDocuments = async (req, res) => {
  const { body, files, user } = req;

  const targetLoanRequest = await LoanRequestModel.findOne({
    _id: body.req_id,
  });

  if (!targetLoanRequest)
    return res.status(404).json({ msg: "اطلاعات معتبر نمی باشد." });

  targetLoanRequest.grade_score = req.body.grade_score;
  targetLoanRequest.status = "pending";

  await targetLoanRequest.save();

  for (let doc in files) {
    const { success, fileKey } = await uploadFileToBucket(
      files[doc][0],
      `/loan-documents/${user._id}`
    );

    if (!success)
      return res
        .status(500)
        .json({ msg: "خطایی در فرایند بارگزاری بوجود آمده است." });

    const fileBodyData = JSON.parse(body[`${doc}_data`]);

    await LoanDocumentModel.create({
      type: fileBodyData.fieldname,
      title: fileBodyData.label,
      fileKey,
      loanId: targetLoanRequest._id,
    });
  }

  res.status(200).json({ msg: "created" });
};

module.exports = { uploadLoanDocuments };
