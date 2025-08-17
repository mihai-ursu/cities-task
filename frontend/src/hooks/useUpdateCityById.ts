import type { CityType } from "@/types/city.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateCityById() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (city: CityType) => {
      const res = await fetch(`http://localhost:3000/cities/${city.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });

      if (!res.ok) {
        throw new Error("Failed to update city");
      }

      return res.json();
    },
    onSuccess: () => {
      // Invalidate all cities queries
      queryClient.invalidateQueries({ queryKey: ["cities"] });

      // Invalidate all weather queries
      queryClient.invalidateQueries({ queryKey: ["city-weather"] });

      // Invalidate all country queries
      queryClient.invalidateQueries({ queryKey: ["country"] });
    },
  });
}

export default useUpdateCityById;
