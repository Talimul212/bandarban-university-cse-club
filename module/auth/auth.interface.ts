import { IUser } from "../users/users.interface";

// We only need email and password for the login attempt
export type TLoginUser = Pick<IUser, "email" | "password">;

export interface TAuthResponse {
  accessToken: string;
  user: Partial<IUser>;
}
