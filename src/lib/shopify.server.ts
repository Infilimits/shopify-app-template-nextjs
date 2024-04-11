import { ApiVersion, LogSeverity, shopifyApi } from "@shopify/shopify-api";
import "@shopify/shopify-api/adapters/node";

export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  scopes: process.env?.SCOPES!.split(","),
  hostName: process.env.SHOPIFY_APP_URL!.replace(/https:\/\//, ""),
  hostScheme: "https",
  apiVersion: ApiVersion.April23,
  isEmbeddedApp: true,
  logger: { level: LogSeverity.Debug, httpRequests: true },
});
