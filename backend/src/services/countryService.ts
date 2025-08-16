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
        population: country.population || 0,
        area: country.area || 0,
        region: country.region || "",
        subregion: country.subregion || "",
        languages: country.languages || {},
        currencies: country.currencies || {},
        flag: country.flag || "",
        coatOfArms: {
          png: country.coatOfArms?.png || "",
          svg: country.coatOfArms?.svg || "",
        },
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
