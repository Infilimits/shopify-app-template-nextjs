import { Session } from "@shopify/shopify-api";
import { headers } from "next/headers";
import { getSession } from "./getSession";
import { getShop, updateShopActivation } from "@/lib/shop.server";
import { firstInstall } from "./firstInstall";
import { registerWebhooks } from "@/lib/webhook.server";

export async function initialPageLoad() {
  try {
    const shop = headers().get("x-shopify-domain");
    const idToken = headers().get("authorization");

    if (shop && idToken) {
      let session: Session;
      const sessions = await sessionStorage.findSessionsByShop(shop);
      if (!sessions.length && !sessions[0]) {
        session = await getSession({ idToken, shop });
      } else {
        session = sessions[0];
      }

      // get shop
      const shopData = await getShop(shop);

      if (!shopData && !shopData[0]) {
        // first install
        await firstInstall(session);
      } else if (!shopData[0].isEnabled) {
        // re installation
        await updateShopActivation(shop, true);
      }
      await registerWebhooks(session);
    }
  } catch (err) {
    console.error("Initial Page load failed", err);
    throw err;
  }
}
