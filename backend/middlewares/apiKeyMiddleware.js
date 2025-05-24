const apiKeyMiddleWare = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) return res.status(400).json({ msg: "api key is required" });

  if (apiKey !== process.env.API_KEY)
    return res.status(400).json({ msg: "api key is not valid" });

  next();
};

module.exports = apiKeyMiddleWare;
