import { useQuery } from "@tanstack/react-query";

async function fetchCities(query: string) {
  const res = await fetch(
    `http://localhost:3000/cities/name/${encodeURIComponent(
      query.toLowerCase()
    )}`
  );
  if (!res.ok) throw new Error("Failed to fetch cities");
  return res.json();
}

export function useGetAllCitiesByName(query: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["cities", query],
    queryFn: () => fetchCities(query),
    staleTime: 60 * 60 * 1000, // 1 hour
    enabled: options?.enabled ?? true,
  });
}
