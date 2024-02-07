import React from "react";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails from "./ForecastWeatherDetail";
import WeatherContainer from "./WeatherContainer";
// import { WeatherDetailProps } from "@/app/weather/weatherInterfaces";
import { temperatureConverter } from "@/utils/temperatureConverter";
// import { ForecastWeatherDetailProps } from "@/app/weather/weatherInterfaces";
import { WeatherDetailProps } from "./WeaterDetails";

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
	weatehrIcon: string | "";
	date: string | "";
	day: string | "";
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	description: string;
}

export default function ForecastWeatherDetail(props: ForecastWeatherDetailProps) {
	const { weatehrIcon, date, day, temp, feels_like, temp_min, temp_max, description } = props;
	return (
		<WeatherContainer className="gap-4">
			<section className=" flex gap-4 items-center px-4  ">
				<div className=" flex flex-col gap-1 items-center">
					<WeatherIcon iconName={weatehrIcon} />
					<p>{date}</p>
					<p className="text-sm">{day} </p>
				</div>
				<div className="flex flex-col px-4">
					<span className="text-5xl">{temperatureConverter(temp ?? 0)}°</span>
					<p className="text-xs space-x-1 whitespace-nowrap">
						<span> Feels like</span>
						<span>{temperatureConverter(feels_like ?? 0)}°</span>
					</p>
					<p className="capitalize"> {description}</p>
				</div>
			</section>
			<section className="w-full overflow-x-auto flex justify-between gap-4 px-4 pr-10">
				<WeatherDetails {...props} />
			</section>
		</WeatherContainer>
	);
}
