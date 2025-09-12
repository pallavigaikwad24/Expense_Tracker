import { axiosInstance } from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { first_name, email, password } = await req.json();
    const api = axiosInstance(true);
    const loginResult = await api.post("/api/register", {
      first_name,
      email,
      password,
    });
    const setCookieHeader = loginResult.headers["set-cookie"];
    const response = NextResponse.json(loginResult.data.data);
    if (setCookieHeader) {
      response.headers.set(
        "Set-Cookie",
        Array.isArray(setCookieHeader)
          ? setCookieHeader.join(",")
          : setCookieHeader
      );
    }

    return response;
  } catch (error: unknown) {
    const err = error as AxiosError<{ error: string[] }>;
    return NextResponse.json(
      { error: err?.response?.data?.error[0] || "Registration failed" },
      { status: err.status }
    );
  }
}
