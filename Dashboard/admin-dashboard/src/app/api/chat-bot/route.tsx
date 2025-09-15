import { axiosInstance } from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const token = req.headers.get("cookie")?.split("=")[1];
    const result = await axiosInstance(true).post(
      `/api/chatbot?token=${token}`,
      { message }
    );
    console.log("Result from chatbot API:", result.data);
    return NextResponse.json({ data: result.data }, { status: 200 });
  } catch (error) {
    console.log("Chatbot API error:", error);
    return NextResponse.json({ error: "Chatbot API error" }, { status: 500 });
  }
}
