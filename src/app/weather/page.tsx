"use client";

import WeatherNavBar from "@/components/WeatherNavBar";
import { WeatherDetail, WeatherData } from "./weatherInterfaces";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Weather = () => {
	const { isPending, error, data } = useQuery<WeatherData>({
		queryKey: ["repoData"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.openweathermap.org/data/2.5/forecast?q=kaunas&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
			);
			console.log("data", data);

			return data;
		},
	});

	// useEffect(() => {
	//   refetch();
	// }, [place, refetch]);

	// if (isPending) return "Loading...";

	return (
		<div className="text-black">
			<WeatherNavBar />
		</div>
	);
};

export default Weather;
