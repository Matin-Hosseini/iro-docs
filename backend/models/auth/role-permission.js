const mongoose = require("mongoose");
const { Schema } = mongoose;

const RolePermissionSchema = new Schema(
  {
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "Roles",
      required: true,
    },
    permission_id: {
      type: Schema.Types.ObjectId,
      ref: "Permissions",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RolePermissions", RolePermissionSchema);
