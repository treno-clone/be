import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
        type: String,
        default: ""
    },
    background_color: {
      type: String,
      required: true,
      default: "#808080",
    },
    position: {
      type: Number,
      required: true,
    },
    dueDate: Date,
    labels: [{ type: Schema.Types.ObjectId, ref: "Label" }],
    assignees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    subtasks: [{ type: Schema.Types.ObjectId, ref: "Subtask" }],
    isArchive: {
      type: Boolean,
      default: false,
      index: true
    },
    listId: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: true,
      index: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const Card = mongoose.model("Card", cardSchema);
export default Card;
