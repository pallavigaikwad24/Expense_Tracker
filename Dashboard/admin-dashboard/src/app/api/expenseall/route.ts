import { axiosInstance } from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, month, year } = await req.json();
    const token = req.headers.get("cookie")?.split("=")[1];
    const result = await axiosInstance(true).get(
      `/api/expenseall/${email}?token=${token}&month=${month}&year=${year}`
    );
    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.log("error from get all expense: ", error);
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}
