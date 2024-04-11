import { NextRequest, NextResponse } from "next/server";
import { Unauthorized } from "./exceptions/Unauthorized";
import { verifyRequest } from "./utils/verifyRequest";

export const config = {
  matcher: [
    /*
     * Exceptions:
     * /api/auth, /api/webhooks,  /api/gdpr, /_next,
     * /_auth, /_static, /_vercel, /public (/favicon.ico, etc)
     * /auth
     */
    "/((?!api/auth|api/webhooks|api/gdpr|_next|_auth|_static|_vercel|auth|[\\w-]+\\.\\w+).*)",
  ],
};

export async function middleware(request: NextRequest) {
  try {
    const params = new URLSearchParams(request.nextUrl.search);
    const headerIdToken = (request.headers.get("authorization") || "").split(
      "Bearer "
    )[1];
    const paramIdToken = params.get("id_token");
    const token = headerIdToken || paramIdToken || null;
    if (!token) throw new Unauthorized("Unauthorized");
    const response = await verifyRequest(token);
    if (!response.payload) throw new Unauthorized("Unauthorized");

    const res = NextResponse.next();
    res.headers.set(
      "Content-Security-Policy",
      `frame-ancestors https://${
        response.shop || "*.myshopify.com"
      } https://admin.shopify.com;`
    );
    res.headers.set("x-shopify-domain", response.shop);

    // setting authorization token on request if id token was found in search params
    if (!request.headers.get("authorization")) {
      res.headers.set("authorization", `Bearer ${token}`);
    }
    return res;
  } catch (err) {
    return NextResponse.json("Something went wrong please refresh the page", {
      status: err instanceof Unauthorized ? 401 : 500,
    });
  }
}
