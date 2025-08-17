import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { AddCity } from "../AddCity/AddCity";

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Cities</CardTitle>
        <CardDescription>
          Enter a city name to search or add a new city to the database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" variant="outline">
            Search
          </Button>
        </form>

        <div className="flex justify-center">
          <AddCity />
        </div>
      </CardContent>
    </Card>
  );
}
