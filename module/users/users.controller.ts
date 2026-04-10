import { UserServices } from "./users.service";
import { UserValidationSchema } from "./users.validation";

// 1. Create User
const createUser = async (data: any) => {
  const validatedData = UserValidationSchema.parse(data);
  const userDataWithDefault = {
    ...validatedData,
    role: validatedData.role || "Subscriber",
  };
  const result = await UserServices.createUserInDB(userDataWithDefault);
  return result;
};

// 2. Get All Users
const getAllUsers = async () => {
  const result = await UserServices.getAllUsersFromDB();
  return result;
};

// --- Added Controller Methods ---

// 3. Get Single User
const getSingleUser = async (id: string) => {
  const result = await UserServices.getSingleUserFromDB(id);
  if (!result) {
    throw new Error("User not found");
  }
  return result;
};

// 4. Update User
const updateUser = async (id: string, data: any) => {
  // Use .partial() to make all Zod fields optional for updates
  const validatedData = UserValidationSchema.partial().parse(data);

  const result = await UserServices.updateUserInDB(id, validatedData);
  if (!result) {
    throw new Error("User not found to update");
  }
  return result;
};

// 5. Delete User
const deleteUser = async (id: string) => {
  const result = await UserServices.deleteUserFromDB(id);
  if (!result) {
    throw new Error("User not found to delete");
  }
  return result;
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
