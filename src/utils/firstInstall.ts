import { saveShop } from "@/lib/shop.server";
import { Session } from "@shopify/shopify-api";

export async function firstInstall(session: Session) {
  await saveShop(session.shop);

  //? Send welcome email here for merchants
}
