import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { sessionTable, shopTable } from "./schema.server";

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const db = drizzle(pool, {
  schema: {
    session: sessionTable,
    shop: shopTable,
  },
});

export default db;
