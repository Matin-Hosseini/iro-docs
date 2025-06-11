const mongoose = require("mongoose");
const { Schema } = mongoose;

const LoanRequest = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product_name: {
      type: String,
      required: true,
      trim: true,
    },
    tracking_code: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "creating", "canceled"],
      default: "creating",
    },
    grade_score: {
      type: String,
      enum: ["A", "B", "C", "D", "E", ""],
      default: "",
    },
    rejectionReason: {
      type: String,
      default: null,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model("Loan_Request", LoanRequest);
