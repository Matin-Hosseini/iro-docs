const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign(
    { ...payload, iat: Math.floor(Date.now() / 1000) - 30 },
    process.env.JWTSECRET,
    {
      expiresIn: "24h",
    }
  );

  return token;
};

module.exports = generateToken;
