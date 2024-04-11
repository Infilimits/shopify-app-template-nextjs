import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import { shopify } from "@/lib/shopify.server";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const topic = req.headers["x-shopify-topic"] || "";
    const shop = req.headers["x-shopify-shop-domain"] || "";

    const buf = await buffer(req);
    const rawBody = buf.toString("utf8");

    await shopify.webhooks.process({
      rawBody: rawBody,
      rawRequest: req,
      rawResponse: res,
    });
    console.info(`processing complete for ${topic} from ${shop}`);
  }
}
