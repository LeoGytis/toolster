import React from "react";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";

export interface WeatherDetailProps {
	sunrise: string;
	sunset: string;
	windSpeed: string;
	airPressure: string;
	visability?: string;
	humidity?: string;
}

const WeatherDetails = ({ sunrise, sunset, windSpeed, airPressure, visability, humidity }: WeatherDetailProps) => {
	return (
		<>
			<SingleWeatherDetail icon={<LuSunrise />} information="Sunrise" value={sunrise} />
			<SingleWeatherDetail icon={<LuSunset />} information="Sunset" value={sunset} />
			<SingleWeatherDetail icon={<MdAir />} information="Wind speed" value={windSpeed} />
			<SingleWeatherDetail icon={<ImMeter />} information="Air Pressure" value={airPressure} />
			{visability && <SingleWeatherDetail icon={<LuEye />} information="Visability" value={visability} />}
			{humidity && <SingleWeatherDetail icon={<FiDroplet />} information="Humidity" value={humidity} />}
		</>
	);
};

export default WeatherDetails;

export interface SingleWeatherDetailProps {
	information: string;
	icon: React.ReactNode;
	value: string;
}

const SingleWeatherDetail = (props: SingleWeatherDetailProps) => {
	return (
		<div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
			<div className="text-3xl">{props.icon}</div>
			<p className="whitespace-nowrap">{props.information}</p>
			<p>{props.value}</p>
		</div>
	);
};
