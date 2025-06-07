const UserModel = require("./../../models/user");
const LoanRequestModel = require("./../../models/loan/loan-request");
const LoanDocumentModel = require("./../../models/loan/loan-document");

const getUserRequestedLoans = async (req, res) => {
  const { user } = req;

  const requestedLoans = await LoanRequestModel.find({ userId: user._id });

  return res.status(200).json({ msg: "ok", requestedLoans });
};

module.exports = { getUserRequestedLoans };
