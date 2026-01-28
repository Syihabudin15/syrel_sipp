import type { NextRequest } from "next/server";
import { refreshToken } from "./libs/Auth";

export async function proxy(request: NextRequest) {
  return await refreshToken(request);
}

export const config = {
  matcher: ["/dashboard", "/rekap", "/tagihan", "/master/:path*"],
};
