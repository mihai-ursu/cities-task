import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  Eye,
  Moon,
  CloudLightning,
} from "lucide-react";

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  className?: string;
}

export default function WeatherIcon({
  iconCode,
  size = 24,
  className = "",
}: WeatherIconProps) {
  const getIconComponent = (code: string) => {
    // OpenWeatherMap icon codes mapping to Lucide icons
    switch (code) {
      // Clear sky
      case "01d":
        return <Sun size={size} className={`text-yellow-500 ${className}`} />;
      case "01n":
        return <Moon size={size} className={`text-blue-300 ${className}`} />;

      // Few clouds
      case "02d":
      case "02n":
        return <Cloud size={size} className={`text-gray-400 ${className}`} />;

      // Scattered clouds
      case "03d":
      case "03n":
        return <Cloud size={size} className={`text-gray-500 ${className}`} />;

      // Broken clouds
      case "04d":
      case "04n":
        return <Cloud size={size} className={`text-gray-600 ${className}`} />;

      // Shower rain
      case "09d":
      case "09n":
        return (
          <CloudDrizzle size={size} className={`text-blue-500 ${className}`} />
        );

      // Rain
      case "10d":
      case "10n":
        return (
          <CloudRain size={size} className={`text-blue-600 ${className}`} />
        );

      // Thunderstorm
      case "11d":
      case "11n":
        return (
          <CloudLightning
            size={size}
            className={`text-purple-600 ${className}`}
          />
        );

      // Snow
      case "13d":
      case "13n":
        return (
          <CloudSnow size={size} className={`text-blue-200 ${className}`} />
        );

      // Mist/Fog
      case "50d":
      case "50n":
        return <Eye size={size} className={`text-gray-400 ${className}`} />;

      // Default fallback
      default:
        return <Sun size={size} className={`text-yellow-500 ${className}`} />;
    }
  };

  return (
    <div className="inline-flex items-center justify-center">
      {getIconComponent(iconCode)}
    </div>
  );
}
