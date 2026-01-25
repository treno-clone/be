import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  workspace: {
    type: Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  background: { type: String },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  isArchive: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true, versionKey: false });

const Board = mongoose.model("Board", boardSchema);
export default Board;
