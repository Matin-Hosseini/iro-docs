const generateToken = require("../../utils/funcs/token");
const OtpModel = require("./../../models/otp");
const UserModel = require("./../../models/user");

const sendOtp = async (req, res) => {
  //   console.log("sending request");
  //   const response = await fetch(
  //     `${process.env.ASANAK_WEB_SERVICE_URL}/sendsms`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         username: process.env.ASANAK_USERNAME,
  //         password: process.env.ASANAK_PASSWORD,
  //         Source: process.env.ASANAK_SOURSE_NUMBER,
  //         destination: "09129323541",
  //         Message: "text",
  //       }),
  //     }
  //   );

  //   console.log(response);
  //   const data = await response.json();
  //   console.log("request sent");
  //   console.log(data);

  const code = Math.floor(10000 + Math.random() * 900000);

  const otp = {
    phone: req.body.phone,
    code,
    expiresAt: new Date(Date.now() + 2 * 60 * 1000),
  };

  const newOtpRecord = await OtpModel.create(otp);

  const otpResponse = { ...otp, request_id: newOtpRecord._id };

  res.status(200).json(otpResponse);
};

const checkOtp = async (req, res) => {
  const { otpCode, phone, reqId } = req.body;

  const targetOtpRecord = await OtpModel.findOne({ _id: reqId });

  if (!targetOtpRecord)
    return tes.status(404).json({ error: "درخواست نامعتبر می باشد" });

  if (phone !== targetOtpRecord.phone || targetOtpRecord.code !== otpCode)
    return res.status(400).json({ error: "اطلاعات وارد شده نامعتبر می باشد." });

  if (targetOtpRecord.isUsed)
    return res.status(409).json({ error: "کد قبلا استفاده شده است" });

  const otpExpireDate = new Date(targetOtpRecord.expiresAt);

  const now = new Date();

  if (now > otpExpireDate)
    return res.status(410).json({ error: "کد منقضی شده است." });

  targetOtpRecord.isUsed = true;
  await targetOtpRecord.save();

  const targetUser = await UserModel.findOne({ phone });
  if (targetUser) {
    const token = generateToken({ phone: targetUser.phone });

    return res.status(200).json({ msg: "ok", user: targetUser, token });
  }

  const token = generateToken({ phone });

  const newUser = await UserModel.create({ phone });
  return res.status(200).json({ msg: "ok", user: newUser, token });
};

module.exports = { sendOtp, checkOtp };
