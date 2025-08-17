import { useQuery } from "@tanstack/react-query";

async function fetchCountryByName(name: string) {
  const res = await fetch(
    `http://localhost:3000/country-info/name/${encodeURIComponent(name)}`
  );
  if (!res.ok) throw new Error("Failed to fetch country");
  return res.json();
}

export function useGetCountryByName(
  name: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["country", name],
    queryFn: () => fetchCountryByName(name),
    staleTime: 60 * 60 * 1000, // 1 hour
    enabled: options?.enabled ?? true,
  });
}
