import { axiosInstance } from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const api = axiosInstance(true);
    const loginResult = await api.post("/api/login", {
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
      { error: err?.response?.data?.error[0] || "Login failed" },
      { status: err.status || 500 }
    );
  }
}
