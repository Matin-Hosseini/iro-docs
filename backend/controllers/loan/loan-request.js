const LoanRequestModel = require("./../../models/loan/loan-request");

const newLoanRequest = async (req, res) => {
  const tracking_code = Math.floor(10000000 + Math.random() * 90000000);

  await LoanRequestModel.create({
    userId: req.user._id,
    product_name: req.body.product_name,
    tracking_code,
  });

  res
    .status(200)
    .json({ msg: "درخواست تسهیلات ایجاد شد.", req_id: tracking_code });
};

module.exports = { newLoanRequest };
