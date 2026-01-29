import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema ({
    title :{
        type: String,
        required: true,
    },
    description: String,
    background_color: {
        type: String,
        required: true,
        default: '#808080'
    },
    position: {
        type: Number,
    },
    dueDate: Date,
    labels: [ { type: Schema.Types.ObjectId, ref: "Label" } ],
    assignees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    subtasks: [{ type: Schema.Types.ObjectId, ref: "Subtask" }],
    isArchive: {
        type: Boolean,
        default: false
    },

},{ timestamps: true, versionKey: false });

const Card = mongoose.model("Card", cardSchema);
export default Card;