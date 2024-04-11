import { Session } from "@shopify/shopify-api";
import type { SessionStorage } from "@shopify/shopify-app-session-storage";
import { sessionTable } from "./schema.server";
import db from "./db.server";
import { eq, inArray } from "drizzle-orm";

export class DrizzleSessionStorage implements SessionStorage {
  public async storeSession(session: Session): Promise<boolean> {
    const data = session.toObject();
    await db
      .insert(sessionTable)
      .values({
        id: data.id,
        shop: data.shop,
        state: data.state,
        isOnline: data.isOnline,
        expires: data.expires && data.expires.toISOString(),
        scope: data.scope,
        accessToken: data.accessToken,
        onlineAccessInfo: JSON.stringify(data.onlineAccessInfo),
      })
      .onConflictDoUpdate({
        target: sessionTable.id,
        set: {
          shop: data.shop,
          state: data.state,
          isOnline: data.isOnline,
          expires: data.expires && data.expires.toISOString(),
          scope: data.scope,
          accessToken: data.accessToken,
          onlineAccessInfo: JSON.stringify(data.onlineAccessInfo),
        },
      });

    return true;
  }

  public async loadSession(id: string): Promise<Session | undefined> {
    const rows = await db
      .select()
      .from(sessionTable)
      .where(eq(sessionTable.id, id));
    if (!Array.isArray(rows) || rows?.length !== 1) return undefined;
    const session = new Session({
      ...rows[0],
      scope: rows[0].scope ?? undefined,
      expires: rows[0].expires ? new Date(rows[0].expires) : undefined,
      accessToken: rows[0].accessToken ?? undefined,
      onlineAccessInfo: rows[0].onlineAccessInfo
        ? JSON.parse(rows[0].onlineAccessInfo)
        : undefined,
    });
    return session;
  }

  public async deleteSession(id: string): Promise<boolean> {
    await db.delete(sessionTable).where(eq(sessionTable.id, id));
    return true;
  }

  public async deleteSessions(ids: string[]): Promise<boolean> {
    await db.delete(sessionTable).where(inArray(sessionTable.id, ids));
    return true;
  }

  public async findSessionsByShop(shop: string): Promise<Session[]> {
    const rows = await db
      .select()
      .from(sessionTable)
      .where(eq(sessionTable.shop, shop));
    if (!Array.isArray(rows) || rows?.length === 0) return [];
    const sessions: Session[] = rows.map((row: any) => {
      return new Session({
        ...rows[0],
        scope: rows[0].scope ?? undefined,
        expires: rows[0].expires ? new Date(rows[0].expires) : undefined,
        accessToken: rows[0].accessToken ?? undefined,
        onlineAccessInfo: rows[0].onlineAccessInfo
          ? JSON.parse(rows[0].onlineAccessInfo)
          : undefined,
      });
    });
    return sessions;
  }
}

const sessionStorage = new DrizzleSessionStorage();

export default sessionStorage;
