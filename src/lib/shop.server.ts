import db from "./db.server";
import { shopTable } from "./schema.server";
import { eq } from "drizzle-orm";

export async function saveShop(shop: string) {
  return await db
    .insert(shopTable)
    .values({
      id: shop,
      isEnabled: true,
    })
    .returning()
    .onConflictDoNothing();
}

export async function getShop(shop: string) {
  return await db
    .select()
    .from(shopTable)
    .where(eq(shopTable.id, shop))
    .limit(1);
}

export async function updateShopActivation(shop: string, isEnabled: boolean) {
  await db.update(shopTable).set({ isEnabled }).where(eq(shopTable.id, shop));
  return true;
}
