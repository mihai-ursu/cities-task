import type { CityFormValues } from "@/components/AddCity/AddCity";
import { useMutation } from "@tanstack/react-query";

function useCreateCity() {
  return useMutation({
    mutationFn: async (data: CityFormValues) => {
      const res = await fetch("http://localhost:3000/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create city");
      }

      return res.json();
    },
  });
}

export default useCreateCity;
