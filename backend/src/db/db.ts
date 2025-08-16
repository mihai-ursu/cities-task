import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import * as schema from "./schema";

// Create (or open) your SQLite database file
const sqlite = new Database("sqlite.db");

// Pass schema so Drizzle knows about your tables
export const db = drizzle(sqlite, { schema });
