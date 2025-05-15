const mongoose = require("mongoose");

const dbConnect = async (MongoURI) => {
  try {
    await mongoose.connect(MongoURI);
    console.log("db connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = dbConnect;
