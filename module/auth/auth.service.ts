import jwt from "jsonwebtoken";
import { UserModel } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import dotenv from "dotenv";

dotenv.config();

const loginUser = async (payload: TLoginUser) => {
  console.log(payload.email);

  // 1. Check if user exists
  const user = await UserModel.findOne({ email: payload.email }).select(
    "+password",
  );

  if (!user) {
    throw new Error("User not found!");
  }

  // 2. Check if password matches (Direct comparison since bcrypt is removed)
  const isPasswordMatched = payload.password === user.password;

  if (!isPasswordMatched) {
    throw new Error("Invalid password!");
  }

  // 3. Create Access Token
  // REMOVED password from payload for security
  const jwtPayload = {
    email: user.email,
    role: user.role,
    userId: user._id,
    name: user.name,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
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
