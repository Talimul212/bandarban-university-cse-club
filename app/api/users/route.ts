/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/dbconnect";
import { UserController } from "@/module/users/users.controller";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const result = await UserController.getAllUsers();
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const result = await UserController.createUser(body);

    return NextResponse.json(
      { success: true, message: "User created successfully", data: result },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create user" },
      { status: 400 },
    );
  }
}
