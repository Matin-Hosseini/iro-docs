const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserRoleSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "Roles",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserRoles", UserRoleSchema);
