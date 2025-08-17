import type { CityType } from "@/types/city.interface";
import { useGetCountryByName } from "@/hooks/useGetCountryByName";
import { useGetCityWeather } from "@/hooks/useGetCityWeather";
import WeatherIcon from "@/components/WeatherIcon/WeatherIcon";

export default function City({ city }: { city: CityType }) {
  const {
    data: countryData,
    isLoading: countryLoading,
    error: countryError,
  } = useGetCountryByName(city.country);

  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError,
  } = useGetCityWeather(city.name);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-800">{city.name}</h3>
          <div className="space-y-1 text-sm">
            <div>
              <span className="font-medium">ID:</span> {city.id}
            </div>
            <div>
              <span className="font-medium">State:</span> {city.state}
            </div>
            <div>
              <span className="font-medium">Country:</span> {city.country}
            </div>
            <div>
              <span className="font-medium">Tourist Rating:</span>{" "}
              {city.touristRating}/5 ⭐
            </div>
            <div>
              <span className="font-medium">Date Established:</span>{" "}
              {city.dateEstablished}
            </div>
            <div>
              <span className="font-medium">Population:</span>{" "}
              {city.estimatedPopulation.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-700">
            Country Information
          </h4>
          {countryLoading ? (
            <div className="text-sm text-gray-500">Loading country data...</div>
          ) : countryError ? (
            <div className="text-sm text-red-500">
              Error loading country data
            </div>
          ) : countryData ? (
            <div className="space-y-1 text-sm">
              <div>
                <span className="font-medium">2-Digit Code:</span>{" "}
                {countryData.cca2 || "N/A"}
              </div>
              <div>
                <span className="font-medium">3-Digit Code:</span>{" "}
                {countryData.cca3 || "N/A"}
              </div>
              <div>
                <span className="font-medium">Currency:</span>{" "}
                {countryData.currencies
                  ? Object.keys(countryData.currencies)[0] || "N/A"
                  : "N/A"}
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              No country data available
            </div>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <h4 className="text-lg font-semibold text-gray-700">
            Current Weather
          </h4>
          {weatherLoading ? (
            <div className="text-sm text-gray-500">Loading weather data...</div>
          ) : weatherError ? (
            <div className="text-sm text-red-500">
              Error loading weather data
            </div>
          ) : weatherData ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <WeatherIcon
                  iconCode={weatherData.weather?.[0]?.icon || "01d"}
                  size={32}
                />
                <div className="text-lg font-medium capitalize">
                  {weatherData.weather?.[0]?.description || "N/A"}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="font-medium">Temperature:</span>{" "}
                  {weatherData.main?.temp
                    ? Math.round(weatherData.main.temp - 273.15)
                    : "N/A"}
                  °C
                </div>
                <div>
                  <span className="font-medium">Humidity:</span>{" "}
                  {weatherData.main?.humidity || "N/A"}%
                </div>
                <div>
                  <span className="font-medium">Wind Speed:</span>{" "}
                  {weatherData.wind?.speed
                    ? Math.round(weatherData.wind.speed * 3.6)
                    : "N/A"}{" "}
                  km/h
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              No weather data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
