const app = require("./app");
const connectDB = require("./config/db");

//db connection
(async () => {
  const { isSuccess } = await connectDB(process.env.MongoURI);

  if (!isSuccess) {
    process.exit();
  }
})();

app.listen(4000, () => {
  console.log("server listening on port 4000");
});
