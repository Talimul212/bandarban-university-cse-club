import EnrollmentForm from "@/app/models/EnrollmentForm";
import dbConnect from "@/lib/dbconnect";
import { saveFile } from "@/lib/fileService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.formData();

    // File fields
    const nidUrl = await saveFile(data.get("nid") as File);
    const birthCertUrl = await saveFile(data.get("birthCert") as File);
    const educationCertUrl = await saveFile(data.get("educationCert") as File);
    const signatureUrl = await saveFile(data.get("signature") as File);

    // Extract non-file fields
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const dateOfBirth = data.get("dateOfBirth");
    const gender = data.get("gender");
    const email = data.get("email");
    const phone = data.get("phone");
    const address = data.get("address");
    const guardianName = data.get("guardianName");
    const guardianPhone = data.get("guardianPhone");
    const guardianRelation = data.get("guardianRelation");
    const educationNotes = data.get("educationNotes");
    const paymentMethod = data.get("paymentMethod");
    const paymentReference = data.get("paymentReference");
    const declarationDate = data.get("declarationDate");
    const nonFileData = {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phone,
      address,
      guardianName: guardianName || "not applicable",
      guardianPhone: guardianPhone || "not applicable",
      guardianRelation: guardianRelation || "not applicable",
      educationNotes: educationNotes || "not applicable",
      paymentMethod,
      paymentReference,
      declarationDate,
    };

    // Parse the educationList
    const educationListRaw = (data.get("educationList") as string) || "[]";
    const educationList = JSON.parse(educationListRaw);

    // File URL
    const fileUrls = {
      nidUrl: nidUrl || "",
      birthCertUrl: birthCertUrl || "",
      educationCertUrl: educationCertUrl || "",
      signatureUrl: signatureUrl || "",
    };

    // Save to MongoDB
    const enrollment = await EnrollmentForm.create({
      ...nonFileData,
      educationList,
      ...fileUrls,
    });

    return NextResponse.json(
      { success: true, data: enrollment },
      { status: 201 },
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
