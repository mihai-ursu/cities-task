import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteCityById() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`http://localhost:3000/cities/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete city");
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

export default useDeleteCityById;
