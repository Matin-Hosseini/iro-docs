const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trime: true,
    },
    description: {
      type: String,
      allowNull: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Roles", RoleSchema);
