import mongoose, { Schema } from "mongoose";

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    background_color: {
      type: String,
      default: "#0C3953",
    },
    position: {
        type: Number,
        required: true
    },
    isArchive: {
      type: Boolean,
      default: false,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    card: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

const List = mongoose.model("List", listSchema);

export default List;
