import { Router } from "express";
import { WeatherService } from "../services/weatherService";

const router = Router();
const weatherService = new WeatherService();

// Get current weather by location name
router.get("/current/:location", async (req, res) => {
  try {
    const { location } = req.params;

    if (!location || location.trim() === "") {
      return res.status(400).json({
        error: {
          message: "Location is required",
        },
      });
    }

    const result = await weatherService.getCurrentWeather(location);

    if ("error" in result) {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Internal server error while fetching weather information",
      },
    });
  }
});

export default router;
