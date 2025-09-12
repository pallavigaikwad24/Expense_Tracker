import { axiosInstance } from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password, email, confirm_password } = await req.json();
    console.log("Email from query params:", email, "-----", password);
    const api = axiosInstance(true);
    const forgotpassword = await api.post("/api/forgotpasswordchange", {
      email,
      password,
      confirm_password
    });

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
