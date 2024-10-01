import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/api/auth";
const allowedOrigins = process.env.NEXT_PUBLIC_ALLOWED_ORIGINS?.split(",") || [];

export const config = {
  matcher: "/api/:path*",
};

export default function middleware(request: Request) {
  if (request.headers.get("Authorization")) {
    const authResult = authMiddleware(request);
    if (!authResult?.isValid && request.url.includes("/api/pages")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  return NextResponse.next();
}
