import { useQuery } from "@tanstack/react-query";

async function fetchCityWeather(cityName: string) {
  const res = await fetch(
    `http://localhost:3000/weather/current/${encodeURIComponent(cityName)}`
  );
  if (!res.ok) throw new Error("Failed to fetch city weather");
  return res.json();
}

export function useGetCityWeather(
  cityName: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["city-weather", cityName],
    queryFn: () => fetchCityWeather(cityName),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: options?.enabled ?? true,
  });
}
