import { shopify } from "@/lib/shopify.server";
import { DeliveryMethod, Session } from "@shopify/shopify-api";
import { updateShopActivation } from "./shop.server";
import sessionStorage from "./session.server";

export async function registerWebhooks(session: Session) {
  shopify.webhooks.addHandlers({
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/api/webhooks",
      callback: processAppUninstall,
    },
  });
  await shopify.webhooks.register({
    session,
  });
}

export async function processAppUninstall(
  topic: string,
  shop: string,
  data: string,
  pid: string
) {
  if (!shop) throw new Error("No Shop found in webhook");
  const sessions = await sessionStorage.findSessionsByShop(shop);
  if (sessions.length) {
    await sessionStorage.deleteSessions(sessions.map((s) => s.id));
  }

  await updateShopActivation(shop, false);
}
