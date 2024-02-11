import React from "react";
import WeatherIcon from "./WeatherIcon";
import WeatherWrapper from "./WeatherWrapper";
import { temperatureConverter } from "@/app/weather/utils/temperatureConverter";
import WeatherDetails, { WeatherDetailProps } from "./WeatherDetails";

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
		<WeatherWrapper className="gap-4">
			<section className=" flex gap-4 items-center px-4  ">
				<div className=" flex flex-col gap-1 items-center">
					<WeatherIcon iconname={weatehrIcon} />
					<p>{date}</p>
					<p className="text-sm">{day} </p>
				</div>
				<div className="flex flex-col px-4">
					<span className="text-5xl">{temperatureConverter(temp ?? 0)}°</span>
					<p className="text-xs space-x-1 whitespace-nowrap"></p>
				</div>
			</section>
			<section className="w-full overflow-x-auto flex justify-between gap-4 px-4 pr-10">
				<WeatherDetails {...props} />
			</section>
		</WeatherWrapper>
	);
}
