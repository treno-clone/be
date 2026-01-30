import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    failedLoginAttempts: { type: Number, default: 0 },
    accountLockUntil: { type: Date, default: null },
    refreshToken: { type: String, default: null },
    resetToken: { type: String, default: null },
  },
  { versionKey: false, timestamps: false },
);

const User = mongoose.model("User", userSchema);
export default User;
