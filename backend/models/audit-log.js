const mongoose = require("mongoose");
const { Schema } = mongoose;

const AuditLogSchema = new Schema(
  {
    action: {
      type: String,
      enum: [
        "login",
        "upload_document",
        "approve_document",
        "reject_document",
        "update_profile",
      ],
      required: true,
    },
    actorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    target: {
      type: {
        type: String,
        enum: ["user", "document"],
        required: true,
      },
      id: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed, 
      default: {},
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model("AuditLog", AuditLogSchema);
