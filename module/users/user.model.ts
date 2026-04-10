import { Schema, model, models } from "mongoose";
import { IUser } from "./users.interface";

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // Hides password by default
    role: {
      type: String,
      enum: ["Administrator", "Editor", "Author", "Subscriber"],
      default: "Subscriber",
    },
  },
  { timestamps: true },
);

// Password hashing middleware removed from here

export const UserModel = models.User || model<IUser>("User", userSchema);
