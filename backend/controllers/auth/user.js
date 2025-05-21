const OtpModel = require("./../../models/otp");

const login = async (req, res) => {
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

  const code = Math.floor(10000 + Math.random() * 90000);

  console.log(req.body);

  const otp = {
    phone: req.body.phone,
    code,
    expiresAt: new Date(Date.now() + 2 * 60 * 1000),
  };

  const newOtpRecord = await OtpModel.create(otp);

  const otpResponse = { ...otp, request_id: newOtpRecord._id };

  res.status(200).json(otpResponse);
};

module.exports = { login };
