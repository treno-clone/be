import mongoose from "mongoose";
import { DB_URL } from "./dotenvConfig";

const connectDB = () => {
    mongoose.connect(DB_URL).then(() => {
        console.log(`Connect db successfully!`);
    })
        .catch((err) => {
            console.log(`Fail to connect db`);
            console.log(`Error: `, err);
        })
}

export default connectDB;