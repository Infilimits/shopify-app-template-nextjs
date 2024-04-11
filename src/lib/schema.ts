import { boolean, pgTable, text } from "drizzle-orm/pg-core";

export const sessionTable = pgTable("session", {
  id: text("id").notNull().primaryKey(),
  shop: text("shop").notNull(),
  state: text("state").notNull(),
  isOnline: boolean("isOnline").notNull(),
  expires: text("expires"),
  scope: text("scope"),
  accessToken: text("accessToken"),
  onlineAccessInfo: text("onlineAccessInfo"),
});

export const shopTable = pgTable("shop", {
  id: text("id").notNull().primaryKey(),
  isEnabled: boolean("isEnabled").default(true),
});
