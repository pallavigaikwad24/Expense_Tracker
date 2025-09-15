import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("Token in middleware:", token); // Debugging line

  const protectedRoutes = ["/dashboard", "/profile"];

  const isProtectedPath = protectedRoutes.some((path) =>
    request.nextUrl.pathname.toLowerCase().startsWith(path)
  );

  if (isProtectedPath && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (request.nextUrl.pathname === "/login" && token) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}
