import * as React from "react";
import {
    Cloud,
    CloudRain,
    CloudSnow,
    CloudDrizzle,
    Sun,
    CloudFog,
    Wind,
    Zap,
} from "lucide-react";

interface WeatherData {
    temperature: number;
    condition: string;
    city: string;
    country: string;
    localTime: string;
}

const weatherIcons: Record<string, React.ReactNode> = {
    Clear: <Sun className="w-5 h-5" />,
    Clouds: <Cloud className="w-5 h-5" />,
    Rain: <CloudRain className="w-5 h-5" />,
    Drizzle: <CloudDrizzle className="w-5 h-5" />,
    Snow: <CloudSnow className="w-5 h-5" />,
    Mist: <CloudFog className="w-5 h-5" />,
    Fog: <CloudFog className="w-5 h-5" />,
    Haze: <CloudFog className="w-5 h-5" />,
    Thunderstorm: <Zap className="w-5 h-5" />,
    Wind: <Wind className="w-5 h-5" />,
};

export function WeatherLocation() {
    const [weather, setWeather] = React.useState<WeatherData | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Get user's location from IP
                const ipResponse = await fetch("https://ipapi.co/json/");
                const ipData = await ipResponse.json();

                const { city, country_name, latitude, longitude, timezone } = ipData;

                // Get weather data from Open-Meteo (free, no API key required)
                const weatherResponse = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=${timezone}`
                );
                const weatherData = await weatherResponse.json();

                // Map weather codes to conditions
                const weatherCode = weatherData.current.weather_code;
                const condition = getWeatherCondition(weatherCode);

                // Get local time
                const localTime = new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });

                setWeather({
                    temperature: Math.round(weatherData.current.temperature_2m),
                    condition,
                    city,
                    country: country_name,
                    localTime,
                });
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch weather:", err);
                setError(true);
                setLoading(false);
            }
        };

        fetchWeather();

        // Update time every minute
        const interval = setInterval(() => {
            setWeather((prev) =>
                prev
                    ? {
                        ...prev,
                        localTime: new Date().toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        }),
                    }
                    : null
            );
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const getWeatherCondition = (code: number): string => {
        if (code === 0) return "Clear";
        if (code <= 3) return "Clouds";
        if (code <= 49) return "Fog";
        if (code <= 59) return "Drizzle";
        if (code <= 69) return "Rain";
        if (code <= 79) return "Snow";
        if (code <= 82) return "Rain";
        if (code <= 86) return "Snow";
        if (code <= 99) return "Thunderstorm";
        return "Clear";
    };

    if (loading) {
        return (
            <div className="flex items-center gap-3 text-neutral-400 text-xs mb-6">
                <div className="w-4 h-4 border-2 border-neutral-700 border-t-neutral-400 rounded-full animate-spin" />
                <span>Loading location...</span>
            </div>
        );
    }

    if (error || !weather) {
        return null;
    }

    const icon = weatherIcons[weather.condition] || weatherIcons.Clear;

    return (
        <div className="flex items-center gap-4 text-xs mb-6 text-neutral-200">
            <div className="flex items-center gap-2">
                <span className="font-mono text-neutral-400">{weather.localTime}</span>
            </div>
            <span className="text-neutral-600">•</span>
            <div className="flex items-center gap-2">
                <span className="text-neutral-300">
                    {weather.city}, {weather.country}
                </span>
            </div>
            <span className="text-neutral-600">•</span>
            <div className="flex items-center gap-2 text-neutral-300">
                <span className="text-neutral-200">{icon}</span>
                <span>{weather.temperature}°C</span>
                <span className="text-neutral-400">{weather.condition}</span>
            </div>
        </div>
    );
}
