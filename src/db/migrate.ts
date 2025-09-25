import * as dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { neon } from "@neondatabase/serverless";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { migrate as migratePg } from "drizzle-orm/node-postgres/migrator";
import {
  drizzle as drizzleNeon,
  type NeonHttpDatabase,
} from "drizzle-orm/neon-http";
import { migrate as migrateNeon } from "drizzle-orm/neon-http/migrator";
import * as schema from "./schema";
import config from "@/conf/config";

const DATABASE_URL = config.databaseUrl;
const DATABASE_PROVIDER = process.env.DATABASE_PROVIDER || "pg";

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

let db: ReturnType<typeof drizzlePg> | NeonHttpDatabase<typeof schema>;

async function runMigrations(): Promise<void> {
  try {
    if (DATABASE_PROVIDER === "pg") {
      const pool = new Pool({ connectionString: DATABASE_URL });
      db = drizzlePg(pool, { schema });
      await migratePg(db, { migrationsFolder: "./drizzle" });
    } else if (DATABASE_PROVIDER === "neon") {
      const sql = neon(DATABASE_URL);
      db = drizzleNeon(sql, { schema });
      await migrateNeon(db, { migrationsFolder: "./drizzle" });
    } else {
      throw new Error('Unknown DATABASE_PROVIDER. Use "pg" or "neon".');
    }

    console.log("Migrations applied successfully");
  } catch (err: unknown) {
    if (err instanceof Error) console.error("Migration error:", err.message);
    else console.error("Unknown migration error:", err);
    process.exit(1);
  }
}

runMigrations();
