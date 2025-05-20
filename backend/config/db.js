const mongoose = require("mongoose");

const connectDB = async (MongoURI) => {
  try {
    const mongoConnection = await mongoose.connect(MongoURI);

    const { connection: connectionInfo } = mongoConnection;

    console.log(
      "✅ MongoDB connected. Connection details: \n",
      `=> host:${connectionInfo.host}:${connectionInfo.port} \n => DB_name:${connectionInfo.name}`
    );

    return { isSuccess: true };
  } catch (error) {
    console.log(error);

    return { isSuccess: false };
  }
};

module.exports = connectDB;
