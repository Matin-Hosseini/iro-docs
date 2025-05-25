const mongoose = require("mongoose");
const { Schema } = mongoose;

const PermissionSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      allowNull: false,
      trim: true,
    },
    title: {
      type: String,
      unique: true,
      allowNull: false,
      trim: true,
    },
    description: {
      type: String,
      allowNull: true,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permissions", PermissionSchema);
