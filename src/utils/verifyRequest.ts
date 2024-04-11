import { jwtVerify } from "jose";
import { shopify } from "@/lib/shopify.server";

export async function verifyRequest(token: string) {
  const secret = new TextEncoder().encode(process.env.SHOPIFY_API_SECRET!);
  const tokenResponse = await jwtVerify(token, secret);

  const shop = ((tokenResponse.payload.dest as string | null) || "").replace(
    "https://",
    ""
  );
  if (!shop && !shopify.utils.sanitizeShop(shop))
    throw new Error("No shop found in token");

  return { payload: tokenResponse.payload, shop };
}
