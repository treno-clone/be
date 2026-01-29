import mongoose, { Schema } from "mongoose";

const recordModel = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: {
      type: String,
      enum: ["create", "update", "delete", "view"],
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const Record = mongoose.model("Record", recordModel);
export default Record;
