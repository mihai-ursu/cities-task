import express from "express";
import { db } from "./db/db";
import { cities } from "./db/schema";
import { eq } from "drizzle-orm";

const app = express();
app.use(express.json());

// Create a city
app.post("/cities", (req, res) => {
  const {
    name,
    state,
    country,
    touristRating,
    dateEstablished,
    estimatedPopulation,
  } = req.body;
  const result = db
    .insert(cities)
    .values({
      name,
      state,
      country,
      touristRating,
      dateEstablished,
      estimatedPopulation,
    })
    .run();
  res.json(result);
});

// Get all cities
app.get("/cities", (req, res) => {
  const result = db.select().from(cities).all();
  res.json(result);
});

// Get city by id
app.get("/cities/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = db.select().from(cities).where(eq(cities.id, id)).get();
  res.json(result || null);
});

// Update city by id
app.put("/cities/:id", (req, res) => {
  const id = Number(req.params.id);
  const {
    name,
    state,
    country,
    touristRating,
    dateEstablished,
    estimatedPopulation,
  } = req.body;
  const result = db
    .update(cities)
    .set({
      name,
      state,
      country,
      touristRating,
      dateEstablished,
      estimatedPopulation,
    })
    .where(eq(cities.id, id))
    .run();
  res.json(result);
});

// Delete city by id
app.delete("/cities/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = db.delete(cities).where(eq(cities.id, id)).run();
  res.json(result);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
