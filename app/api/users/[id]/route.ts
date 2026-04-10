/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/dbconnect";
import { UserController } from "@/module/users/users.controller";
import { NextResponse } from "next/server";

// Type for Next.js 15 dynamic parameters
type TParams = { params: Promise<{ id: string }> };

/**
 * GET: Fetch a single user by ID
 */
export async function GET(req: Request, { params }: TParams) {
  try {
    await dbConnect();
    const { id } = await params; // Await params for Next.js 15
    const result = await UserController.getSingleUser(id);

    return NextResponse.json({
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "User not found" },
      { status: 404 },
    );
  }
}

/**
 * PATCH: Update user information
 */
export async function PATCH(req: Request, { params }: TParams) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const result = await UserController.updateUser(id, body);

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Update failed" },
      { status: 400 },
    );
  }
}

/**
 * DELETE: Remove user from DB
 */
export async function DELETE(req: Request, { params }: TParams) {
  try {
    await dbConnect();
    const { id } = await params;
    await UserController.deleteUser(id);

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Delete failed" },
      { status: 400 },
    );
  }
}
