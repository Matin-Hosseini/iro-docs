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
    birth_date: {
      type: Date,
      default: null,
      trim: true,
    },
    national_id: {
      type: String,
      default: null,
      trim: true,
    },
    fathers_name: {
      type: String,
      default: null,
      trim: true,
    },
    grade_score: {
      type: String,
      default: null,
      enum: ["A", "B", "C", "D", "E"],
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
