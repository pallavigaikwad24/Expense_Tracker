import { axiosInstance } from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const api = axiosInstance(true);
    const forgotpassword = await api.post("/api/forgotpassword", { email });
    return NextResponse.json({ data: forgotpassword.data.data });
  } catch (error) {
    console.log("Forgot Password error:", error);
    const err = error as AxiosError<{ error: string[] }>;
    return NextResponse.json(
      { error: err?.response?.data?.error[0] || "Login failed" },
      { status: err.status || 500 }
    );
  }
}
