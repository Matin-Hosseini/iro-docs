const UserModel = require("./../../models/user");
const LoanRequestModel = require("./../../models/loan/loan-request");
const LoanDocumentModel = require("./../../models/loan/loan-document");

const getUserRequestedLoans = async (req, res) => {
  const { user } = req;

  const requestedLoans = await LoanRequestModel.find({ userId: user._id });

  return res.status(200).json({ msg: "ok", requestedLoans });
};

const getUserLoanInfo = async (req, res) => {
  const { body } = req;

  const targetLoan = await LoanRequestModel.findOne({
    tracking_code: body.tracking_code,
  });

  if (!targetLoan) return res.status(404).json({ msg: "تسهیلات یافت نشد." });

  return res.status(200).json({ msg: "تسهیلات دریافت شد.", loan: targetLoan });
};

module.exports = { getUserRequestedLoans, getUserLoanInfo };
