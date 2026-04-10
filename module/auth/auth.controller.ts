// module/auth/auth.controller.ts
import { AuthServices } from "./auth.service";
// module/auth/auth.controller.ts
const loginUser = async (payload: any) => {
  // Directly use 'payload.email' - do not call await req.json() here!
  const result = await AuthServices.loginUser(payload);

  return {
    success: true,
    message: "User logged in successfully!",
    data: result,
  };
};

export const AuthController = {
  loginUser,
};
