import React from "react";
import Image from "next/image";
import { cn } from "@/app/weather/utils/cn";

type Props = {};

export default function WeatherIcon(props: React.HTMLProps<HTMLDivElement> & { iconname: string }) {
	return (
		<div title={props.iconname} {...props} className={cn("relative h-14 w-14")}>
			<Image
				width={100}
				height={100}
				alt="weather-icon"
				className="absolute h-full w-full"
				src={`https://openweathermap.org/img/wn/${props.iconname}@4x.png`}
			/>
		</div>
	);
}
