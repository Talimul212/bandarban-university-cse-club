import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Check if model exists before creating a new one (important for Next.js HMR)
const User = models.User || model<IUser>("User", UserSchema);

export default User;

// ─── Types: For Enroll Management

interface Education {
  institutionName: string;
  degree: string;
  yearCompleted: string;
  _id: string;
}

export interface Enrollment {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  guardianRelation: string;
  educationList: Education[];
  educationNotes: string;
  paymentMethod: string;
  paymentReference: string;
  declarationDate: string;
  nidUrl: string;
  birthCertUrl: string;
  educationCertUrl: string;
  signatureUrl: string;
  createdAt: string;
  updatedAt: string;
}
