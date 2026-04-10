import { UserModel } from "./user.model";
import { IUser } from "./users.interface";

const createUserInDB = async (payload: IUser) => {
  const result = await UserModel.create(payload);
  return result;
};

const getAllUsersFromDB = async () => {
  return await UserModel.find();
};

// --- Added Methods ---

// 1. Get Single User by ID
const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};

// 2. Update User by ID
const updateUserInDB = async (id: string, payload: Partial<IUser>) => {
  // { new: true } returns the updated document
  // { runValidators: true } ensures Zod/Mongoose rules still apply
  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// 3. Delete User by ID (Soft delete or Hard delete)
const deleteUserFromDB = async (id: string) => {
  const result = await UserModel.findByIdAndDelete(id);
  return result;
};

export const UserServices = {
  createUserInDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
