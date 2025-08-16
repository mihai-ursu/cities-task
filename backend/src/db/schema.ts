import { sqliteTable, int, text, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const cities = sqliteTable(
  "cities",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    state: text("state").notNull(),
    country: text("country").notNull(),
    touristRating: int("tourist_rating").notNull(),
    dateEstablished: text("date_established").notNull(),
    estimatedPopulation: int("estimated_population").notNull(),
  },
  (table) => [
    check("tourist_rating_check", sql`${table.touristRating} BETWEEN 1 AND 5`),
  ]
);
