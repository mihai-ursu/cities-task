import { useState } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import { useGetAllCitiesByName } from "./hooks/useGetAllCitiesByName";
import City from "@/components/CIty/City";
import type { CityType } from "./types/city";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);

  // Only call the hook when we actually want to search
  const {
    data: cities,
    isLoading,
    error,
  } = useGetAllCitiesByName(searchQuery, {
    enabled: shouldSearch && searchQuery.length > 0,
  });

  console.log(cities);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShouldSearch(true);
  };

  return (
    <main className="min-h-screen bg-background p-6 py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">City Search</h1>
          <p className="text-muted-foreground">
            Search for cities or add new ones to your collection
          </p>
        </div>
        <SearchForm onSearch={handleSearch} />

        {/* Display search results */}
        {isLoading && <div className="text-center">Loading...</div>}

        {error && (
          <div className="text-center text-red-500">Error: {error.message}</div>
        )}

        {cities && cities.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Search Results:</h2>
            <div className="grid gap-2">
              {cities.map((city: CityType) => (
                <City key={city.id} city={city} />
              ))}
            </div>
          </div>
        )}
        {cities && cities.length === 0 && shouldSearch && (
          <div className="text-center text-muted-foreground">
            No cities found
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
