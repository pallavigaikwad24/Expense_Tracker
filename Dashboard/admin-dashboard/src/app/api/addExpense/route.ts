import { axiosInstance } from "@/utils/axiosInstance";
import  { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { owner, date, amount, category } = await req.json();
    console.log("Received expense data:", date);
    const result = await axiosInstance(true).post("/api/addExpense", {
      date: date || new Date().toISOString().split("T")[0],
      amount,
      category,
      owner,
    });
    console.log("Result 099999:", result.data);
    return NextResponse.json({ data: result.data });
  } catch (error: unknown) {
    console.log("Error: ", error);
    let statusCode = 500;

    if (error instanceof AxiosError) {
      statusCode = error.response?.status || 500;
    }

    return NextResponse.json(
      { error: "Error adding expense" },
      { status: statusCode }
    );
  }
}
