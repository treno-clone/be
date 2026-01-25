import mongoose, { Schema } from "mongoose";

const workspaceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["member", "admin", "viewer"],
          default: "member",
        },
      },
    ],
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
  },
  { timestamps: true, versionKey: false },
);

const Workspace = mongoose.model("Workspace", workspaceSchema);
export default Workspace;
