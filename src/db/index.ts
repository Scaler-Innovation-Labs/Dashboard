import config from "@/conf/config";
import * as schema from "./schema";

// Import both drivers
import { Pool } from "pg";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Determine which provider to use
const DATABASE_PROVIDER = process.env.DATABASE_PROVIDER || "pg";

let db;
let sql;

if (DATABASE_PROVIDER === "pg") {
  // Local Docker Postgres
  const pool = new Pool({ connectionString: config.databaseUrl });
  db = drizzlePg(pool, { schema });
  sql = pool;
} else if (DATABASE_PROVIDER === "neon") {
  // Remote Neon DB
  const sqlNeon = neon(config.databaseUrl);
  db = drizzleNeon(sqlNeon, { schema });
  sql = sqlNeon;
} else {
  throw new Error(
    'Unknown DATABASE_PROVIDER. Use "pg" for local or "neon" for remote.',
  );
}

export { db, sql };
