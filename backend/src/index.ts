import "dotenv/config";
import express from "express";
import citiesRouter from "./routes/cities";
import countryInfoRouter from "./routes/countryInfo";
import weatherRouter from "./routes/weather";

const app = express();
app.use(express.json());

// Route handlers
app.use("/cities", citiesRouter);
app.use("/country-info", countryInfoRouter);
app.use("/weather", weatherRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    endpoints: {
      cities: "/cities",
      countryInfo: "/country-info",
      weather: "/weather",
    },
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("\nAvailable endpoints:");
  console.log("• Cities: http://localhost:3000/cities");
  console.log("• Country Info: http://localhost:3000/country-info");
  console.log("• Weather: http://localhost:3000/weather");
});
