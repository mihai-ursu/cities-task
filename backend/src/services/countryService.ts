import { CountryInfo, ApiError } from "../types/api";

export class CountryService {
  private readonly baseUrl = "https://restcountries.com/v3.1";

  async getCountryByName(countryName: string): Promise<CountryInfo | ApiError> {
    try {
      const response = await fetch(
        `${this.baseUrl}/name/${encodeURIComponent(countryName)}`
      );

      if (!response.ok) {
        return {
          error: {
            message: `Country not found: ${countryName}`,
            code: response.status,
          },
        };
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        return {
          error: {
            message: `No data found for country: ${countryName}`,
          },
        };
      }

      // Return the first match (most relevant)
      const country = data[0];

      return {
        name: {
          common: country.name?.common || "",
          official: country.name?.official || "",
        },
        capital: country.capital || [],
        currencies: country.currencies || {},
        cca2: country.cca2 || "",
        cca3: country.cca3 || "",
      };
    } catch (error) {
      return {
        error: {
          message: `Failed to fetch country information: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        },
      };
    }
  }
}
