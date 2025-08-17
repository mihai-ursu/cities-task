import { CountryService } from "../../services/countryService";
import { CountryInfo } from "../../types/api";

// Mock fetch globally
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe("CountryService", () => {
  let countryService: CountryService;

  beforeEach(() => {
    countryService = new CountryService();
    jest.clearAllMocks();
  });

  describe("getCountryByName", () => {
    const mockCountryData = {
      name: {
        common: "France",
        official: "French Republic",
      },
      capital: ["Paris"],
      currencies: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      cca2: "FR",
      cca3: "FRA",
    };

    it("should return country information for valid country name", async () => {
      // Arrange
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue([mockCountryData]),
      } as any;

      mockFetch.mockResolvedValue(mockResponse);

      // Act
      const result = await countryService.getCountryByName("France");

      // Assert
      expect(mockFetch).toHaveBeenCalledWith(
        "https://restcountries.com/v3.1/name/France"
      );
      expect(result).toEqual({
        name: {
          common: "France",
          official: "French Republic",
        },
        capital: ["Paris"],
        currencies: {
          EUR: {
            name: "Euro",
            symbol: "€",
          },
        },
        cca2: "FR",
        cca3: "FRA",
      });
    });

    it("should handle country names with special characters", async () => {
      // Arrange
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue([mockCountryData]),
      } as any;

      mockFetch.mockResolvedValue(mockResponse);
      const countryName = "Côte d'Ivoire";

      // Act
      await countryService.getCountryByName(countryName);

      // Assert
      expect(mockFetch).toHaveBeenCalledWith(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
      );
    });

    it("should return error when country is not found (404)", async () => {
      // Arrange
      const mockResponse = {
        ok: false,
        status: 404,
        json: jest.fn(),
      } as any;

      mockFetch.mockResolvedValue(mockResponse);

      // Act
      const result = await countryService.getCountryByName(
        "NonExistentCountry"
      );

      // Assert
      expect(result).toEqual({
        error: {
          message: "Country not found: NonExistentCountry",
          code: 404,
        },
      });
    });

    it("should return error when API returns empty array", async () => {
      // Arrange
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue([]),
      } as any;

      mockFetch.mockResolvedValue(mockResponse);

      // Act
      const result = await countryService.getCountryByName("EmptyResult");

      // Assert
      expect(result).toEqual({
        error: {
          message: "No data found for country: EmptyResult",
        },
      });
    });

    it("should return error when API returns non-array data", async () => {
      // Arrange
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(null),
      } as any;

      mockFetch.mockResolvedValue(mockResponse);

      // Act
      const result = await countryService.getCountryByName("InvalidData");

      // Assert
      expect(result).toEqual({
        error: {
          message: "No data found for country: InvalidData",
        },
      });
    });

    it("should handle network errors gracefully", async () => {
      // Arrange
      const networkError = new Error("Network error");
      mockFetch.mockRejectedValue(networkError);

      // Act
      const result = await countryService.getCountryByName("France");

      // Assert
      expect(result).toEqual({
        error: {
          message: "Failed to fetch country information: Network error",
        },
      });
    });

    it("should handle unknown errors gracefully", async () => {
      // Arrange
      mockFetch.mockRejectedValue("Unknown error");

      // Act
      const result = await countryService.getCountryByName("France");

      // Assert
      expect(result).toEqual({
        error: {
          message: "Failed to fetch country information: Unknown error",
        },
      });
    });

    it("should handle missing optional fields in API response", async () => {
      // Arrange
      const incompleteCountryData = {
        name: {
          common: "TestCountry",
          // Missing official name
        },
        // Missing most optional fields
        population: 1000000,
      };

      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue([incompleteCountryData]),
      } as any;

      mockFetch.mockResolvedValue(mockResponse);

      // Act
      const result = await countryService.getCountryByName("TestCountry");

      // Assert
      expect(result).toEqual({
        name: {
          common: "TestCountry",
          official: "",
        },
        capital: [],
        population: 1000000,
        area: 0,
        region: "",
        subregion: "",
        languages: {},
        currencies: {},
        flag: "",
        coatOfArms: {
          png: "",
          svg: "",
        },
      });
    });

    it("should return first country when multiple matches are found", async () => {
      // Arrange
      const multipleCountries = [
        {
          ...mockCountryData,
          name: { common: "First Country", official: "First" },
        },
        {
          ...mockCountryData,
          name: { common: "Second Country", official: "Second" },
        },
      ];

      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(multipleCountries),
      } as any;

      mockFetch.mockResolvedValue(mockResponse);

      // Act
      const result = await countryService.getCountryByName("Country");

      // Assert
      expect((result as CountryInfo).name.common).toBe("First Country");
    });

    it("should handle server errors (500)", async () => {
      // Arrange
      const mockResponse = {
        ok: false,
        status: 500,
        json: jest.fn(),
      } as any;

      mockFetch.mockResolvedValue(mockResponse);

      // Act
      const result = await countryService.getCountryByName("France");

      // Assert
      expect(result).toEqual({
        error: {
          message: "Country not found: France",
          code: 500,
        },
      });
    });

    it("should handle JSON parsing errors", async () => {
      // Arrange
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
      } as any;

      mockFetch.mockResolvedValue(mockResponse);

      // Act
      const result = await countryService.getCountryByName("France");

      // Assert
      expect(result).toEqual({
        error: {
          message: "Failed to fetch country information: Invalid JSON",
        },
      });
    });
  });
});
