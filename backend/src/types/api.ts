// Country Info API Response Types
export interface CountryInfo {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  population: number;
  area: number;
  region: string;
  subregion: string;
  languages: Record<string, string>;
  currencies: Record<
    string,
    {
      name: string;
      symbol: string;
    }
  >;
  flag: string;
  coatOfArms: {
    png: string;
    svg: string;
  };
}

// Weather API Response Types
export interface WeatherInfo {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// API Error Response Type
export interface ApiError {
  error: {
    message: string;
    code?: string | number;
  };
}
