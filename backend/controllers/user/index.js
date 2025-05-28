const UserModel = require("./../../models/user");

const updateUserInfo = async (req, res) => {
  const targetuserWithNationalId = await UserModel.findOne({
    national_id: req.body.national_id,
  });

  if (
    targetuserWithNationalId &&
    targetuserWithNationalId._id.toString() !== req.user._id.toString() &&
    targetuserWithNationalId.phone === req.user.phone
  ) {
    return res.status(409).json({
      msg: "کد ملی قبلا ثبت شده است. لطفاً با شماره ای که ثبت نام کرده اید وارد شوید.",
    });
  }

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: req.user._id },
    req.body
  );

  return res.status(200).json({ msg: "ok", updatedUser });
};

module.exports = { updateUserInfo };
