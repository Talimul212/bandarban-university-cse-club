/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/login/route.ts
import dbConnect from "@/lib/dbconnect";
import { AuthController } from "@/module/auth/auth.controller";
import { AuthValidation } from "@/module/auth/auth.validation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    // 1. READ THE BODY ONLY ONCE
    const rawData = await req.json();

    // 2. VALIDATE using the variable 'rawData', NOT 'req'
    if (AuthValidation.loginValidationSchema) {
      AuthValidation.loginValidationSchema.parse({ body: rawData });
    }

    // 3. PASS THE VARIABLE to the controller
    const result = await AuthController.loginUser(rawData);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Login Route Error:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Authentication failed",
      },
      { status: 400 },
    );
  }
}
