const LoanRequestModel = require("./../../models/loan/loan-request");

const newLoanRequest = async (req, res) => {
  console.log(req.body);

  const newLoanRequest = await LoanRequestModel.create({
    userId: req.user._id,
    product_name: req.body.product_name,
  });

  res
    .status(200)
    .json({ msg: "درخواست تسهیلات ایجاد شد.", req_id: newLoanRequest._id });
};

module.exports = { newLoanRequest };
