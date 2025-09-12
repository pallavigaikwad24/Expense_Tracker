import { axiosInstance } from "@/utils/axiosInstance";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const res = NextResponse.json({ message: "Logged out successfully" });
    res.headers.set(
      "Set-Cookie",
      "token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax"
    );
    await axiosInstance(true).post("/api/logout");
    return res;
  } catch (error) {
    console.log("Logout error:", error);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
