import { Schema } from "mongoose";

const cardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    images: String,

})