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
      default: "",
      trim: true,
    },
    lastName: {
      type: String,
      default: "",
      trim: true,
    },
    birth_date: {
      type: Date,
      default: "",
      trim: true,
    },
    national_id: {
      type: String,
      default: "",
      trim: true,
    },
    fathers_name: {
      type: String,
      default: "",
      trim: true,
    },
    grade_score: {
      type: String,
      default: "",
      enum: ["A", "B", "C", "D", "E", ""],
    },
    postal_code: {
      type: String,
      default: "",
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked", "waiting"],
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
