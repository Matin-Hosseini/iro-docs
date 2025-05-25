const { sendMessage } = require("../../utils/funcs/message");
const { generateToken, validateToken } = require("../../utils/funcs/token");
const OtpModel = require("./../../models/otp");
const UserModel = require("./../../models/user");
const jwt = require("jsonwebtoken");

const sendOtp = async (req, res) => {
  const code = Math.floor(10000 + Math.random() * 900000);

  const otp = {
    phone: req.body.phone,
    code,
    expiresAt: new Date(Date.now() + 2 * 60 * 1000),
  };

  const otpMessageText = `به سامانه جامع ایران اورجینال خوش آمدید. \n کد ورود شما: ${code}`;

  const { isMessageSent } = await sendMessage(req.body.phone, otpMessageText);

  if (!isMessageSent)
    return res
      .status(500)
      .json({ msg: "خطا در برقراری ارتباط با سرویس دهنده" });

  const newOtpRecord = await OtpModel.create({
    ...otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  res.status(200).json({ ...otp, request_id: newOtpRecord._id });
};

const checkOtp = async (req, res) => {
  const { otpCode, phone, reqId } = req.body;

  const targetOtpRecord = await OtpModel.findOne({ _id: reqId });

  if (!targetOtpRecord)
    return res.status(404).json({ msg: "درخواست نامعتبر می باشد" });

  if (targetOtpRecord.isUsed)
    return res.status(409).json({ msg: "کد قبلا استفاده شده است" });

  targetOtpRecord.isUsed = true;
  await targetOtpRecord.save();

  if (phone !== targetOtpRecord.phone || targetOtpRecord.code !== otpCode)
    return res.status(400).json({ msg: "اطلاعات وارد شده نامعتبر می باشد." });

  const otpExpireDate = new Date(targetOtpRecord.expiresAt);

  const now = new Date();

  if (now > otpExpireDate)
    return res.status(410).json({ msg: "کد منقضی شده است." });

  const targetUser = await UserModel.findOne({ phone });
  if (targetUser) {
    const token = generateToken({ phone: targetUser.phone });

    return res.status(200).json({ msg: "ok", user: targetUser, token });
  }

  const token = generateToken({ phone });

  const newUser = await UserModel.create({ phone });
  return res.status(200).json({ msg: "ok", user: newUser, token });
};

const me = async (req, res) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(400).json({ msg: "token is required" });

  const validatedToken = await validateToken(token);

  if (!validatedToken) return res.status(400).json({ msg: "token is expired" });

  const user = await UserModel.findOne({ phone: validatedToken.decoded.phone });

  return res.status(200).json({ msg: "ok", user });
};

module.exports = { sendOtp, checkOtp, me };
