import mongoose, { Schema } from "mongoose";

const subtaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    assignee: { type: Schema.Types.ObjectId, ref: "User" },
    dueDate: { type: Date, default: null },
    card: { type: Schema.Types.ObjectId, ref: "Card", required: true },
  },
  { timestamps: true, versionKey: false },
);
const Subtask = mongoose.model("Subtask", subtaskSchema);

export default Subtask;
