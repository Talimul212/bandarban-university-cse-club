import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
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

// Hash password before saving to DB
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

export const UserModel = models.User || model<IUser>("User", userSchema);
