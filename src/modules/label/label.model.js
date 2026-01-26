import mongoose, { Schema } from "mongoose";

const labelSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
        // match: /^#([0-9A-F]{3}){1,2}$/i,
    }
}, { timestamps: true, versionKey: false });

const Label = mongoose.model("Label", labelSchema);
export default Label;