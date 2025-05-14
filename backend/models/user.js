const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      default: null,
      trim: true,
    },
    lastName: {
      type: String,
      default: null,
      trim: true,
    },
    email: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
