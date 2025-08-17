import { WeatherInfo, ApiError } from "../types/api";

export class WeatherService {
  private readonly baseUrl = "https://api.openweathermap.org/data/2.5";
  private readonly apiKey: string;

  constructor() {
    // You'll need to set your WeatherAPI key in environment variables
    this.apiKey = process.env.WEATHER_API_KEY || "";

    if (!this.apiKey) {
      console.warn(
        "⚠️  WEATHER_API_KEY not found in environment variables. Weather endpoints will not work."
      );
    }
  }

  async getCurrentWeather(location: string): Promise<WeatherInfo | ApiError> {
    if (!this.apiKey) {
      return {
        error: {
          message:
            "Weather API key not configured. Please set WEATHER_API_KEY environment variable.",
        },
      };
    }

    try {
      const url = `${this.baseUrl}/weather?q=${encodeURIComponent(
        location
      )}&appid=${this.apiKey}`;
      console.log(
        `🌤️  Fetching weather from: ${url.replace(
          this.apiKey,
          "API_KEY_HIDDEN"
        )}`
      );

      const response = await fetch(url);

      if (!response.ok) {
        console.log(
          `❌ Response status: ${response.status} ${response.statusText}`
        );
      }

      const data = (await response.json()) as WeatherInfo;
      console.log(`✅ Weather data retrieved for: ${data.name}`);

      return data;
    } catch (error) {
      console.error(`❌ Network error:`, error);
      return {
        error: {
          message: `Failed to fetch weather information: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        },
      };
    }
  }
}
