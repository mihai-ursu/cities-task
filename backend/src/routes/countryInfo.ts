import { Router } from "express";
import { CountryService } from "../services/countryService";

const router = Router();
const countryService = new CountryService();

// Get country information by name
router.get("/name/:countryName", async (req, res) => {
  try {
    const { countryName } = req.params;

    if (!countryName || countryName.trim() === "") {
      return res.status(400).json({
        error: {
          message: "Country name is required",
        },
      });
    }

    const result = await countryService.getCountryByName(countryName);

    if ("error" in result) {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Internal server error while fetching country information",
      },
    });
  }
});

export default router;
