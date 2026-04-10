import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import dotenv from "dotenv";
dotenv.config();
const loginUser = async (payload: TLoginUser) => {
  // 1. Check if user exists (explicitly select password since it's hidden in model)
  const user = await UserModel.findOne({ email: payload.email }).select(
    "+password",
  );

  if (!user) {
    throw new Error("User not found!");
  }

  // 2. Check if password matches
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid password!");
  }

  // 3. Create Access Token
  const jwtPayload = {
    email: user.email,
    role: user.role,
    password: user.password, // Include password in JWT payload (not recommended for production)
    userId: user._id,
    name: user.name,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string, // Ensure this matches your .env exactly
    { expiresIn: "1d" },
  );

  return {
    accessToken,
    user,
  };
};

export const AuthServices = {
  loginUser,
};
