import { Router } from "express";
import { db } from "../db/db";
import { cities } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();

// Create a city
router.post("/", (req, res) => {
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
router.get("/", (req, res) => {
  const result = db.select().from(cities).all();
  res.json(result);
});

// Get city by id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = db.select().from(cities).where(eq(cities.id, id)).get();
  res.json(result || null);
});

// Update city by id
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { touristRating, dateEstablished, estimatedPopulation } = req.body;
  const result = db
    .update(cities)
    .set({
      touristRating,
      dateEstablished,
      estimatedPopulation,
    })
    .where(eq(cities.id, id))
    .run();
  res.json(result);
});

// Delete city by id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = db.delete(cities).where(eq(cities.id, id)).run();
  res.json(result);
});

export default router;
