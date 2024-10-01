import { NextResponse } from "next/server";



const validateToken = (token: any) => {
  const validToken = true;
  if (!validToken || !token) {
    return false;
  }
  return true;
};

export function authMiddleware(request: Request): any {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  console.log(token);

  return { isValid: validateToken(token) };
}



