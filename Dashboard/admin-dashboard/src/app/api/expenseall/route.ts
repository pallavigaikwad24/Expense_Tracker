import { axiosInstance } from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const api = axiosInstance(true);
    const result = await api.get("/api/expenseall");
    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.log("error from get all expense: ", error);
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}
