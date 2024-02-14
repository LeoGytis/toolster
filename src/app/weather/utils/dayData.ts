import { WeatherDataProps, WeatherDetailProps } from "../types/weatherInterfaces";

interface DayWeatherData {
	[date: string]: WeatherDetailProps[];
}

const dayData = (data: WeatherDataProps) => {
	const dayWeatherData: { [date: string]: WeatherDetailProps[] } = {};

	data.list.forEach((entry: WeatherDetailProps) => {
		const date = new Date(entry.dt * 1000).toISOString().split("T")[0];

		if (!dayWeatherData[date]) {
			dayWeatherData[date] = [];
		}

		dayWeatherData[date].push(entry);
	});

	return dayWeatherData;
};

export default dayData;
