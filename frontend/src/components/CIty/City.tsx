import type { CityType } from "@/types/city";

export default function City({ city }: { city: CityType }) {
  return (
    <div className="p-3 border rounded-lg">
      <div className="font-medium">{city.name}</div>
      {city.country && (
        <div className="text-sm text-muted-foreground">{city.country}</div>
      )}
    </div>
  );
}
