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

const validateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    return { isValid: true, decoded };
  } catch (error) {
    return { isValid: false };
  }
};

module.exports = { generateToken, validateToken };
