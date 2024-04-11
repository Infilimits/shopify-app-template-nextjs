import sessionStorage from "@/lib/session.server";
import { shopify } from "@/lib/shopify.server";
import { RequestedTokenType, Session } from "@shopify/shopify-api";

export const getSession = async ({
  idToken,
  shop,
}: {
  idToken: string;
  shop: string;
}) => {
  try {
    console.log("GENERATING NEW SESSION");
    const { session } = await shopify.auth.tokenExchange({
      sessionToken: idToken,
      shop,
      requestedTokenType: RequestedTokenType.OfflineAccessToken,
    });
    // deleting sessions that are now unauthenticated
    const sessions = await sessionStorage.findSessionsByShop(shop);
    if (sessions.length) {
      await sessionStorage.deleteSessions(sessions.map((s) => s.id));
    }

    await sessionStorage.storeSession(session);

    return new Session(session);
  } catch (err) {
    console.error("Error during token exchange", err);
    throw err;
  }
};
