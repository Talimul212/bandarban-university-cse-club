export type TUserRole = "Administrator" | "Editor" | "Author" | "Subscriber";

export interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
  role: TUserRole;
}
