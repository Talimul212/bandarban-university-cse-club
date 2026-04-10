import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IEnrollment extends Document {
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
  educationList: {
    institutionName: string;
    degree: string;
    yearCompleted: string;
  }[];
  educationNotes?: string;
  paymentMethod: string;
  paymentReference: string;
  declarationDate: string;
  // File paths/URLs
  nidUrl?: string;
  birthCertUrl?: string;
  educationCertUrl?: string;
  signatureUrl?: string;
}

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, default: "Not Specified" },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    guardianName: { type: String, required: true },
    guardianPhone: { type: String, required: true },
    guardianRelation: { type: String, required: true },
    educationList: [
      {
        institutionName: String,
        degree: String,
        yearCompleted: String,
      },
    ],
    educationNotes: String,
    paymentMethod: { type: String, default: "Bank Transfer" },
    paymentReference: { type: String, required: true },
    declarationDate: { type: String, required: true },
    nidUrl: String,
    birthCertUrl: String,
    educationCertUrl: String,
    signatureUrl: String,
  },
  { timestamps: true },
);

export default models.Enrollment ||
  model<IEnrollment>("Enrollment", EnrollmentSchema);
