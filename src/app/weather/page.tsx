"use client";

import WeatherNavBar from "@/components/WeatherNavBar";
import { WeatherDetail, WeatherData } from "./weatherInterfaces";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { format } from "date-fns/format";
import { parseISO } from "date-fns";
import WeatherContainer from "@/components/WeatherContainer";
import { temperatureConverter } from "@/utils/temperatureConverter";

const Weather = () => {
	const { isPending, error, data } = useQuery<WeatherData>({
		queryKey: ["repoData"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.openweathermap.org/data/2.5/forecast?q=kaunas&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
			);
			return data;
		},
	});
	// useEffect(() => {
	// 	refetch();
	// }, [place, refetch]);

	const firstData = data?.list[0];

	if (isPending)
		return (
			<div className="flex items-center min-h-screen justify-center">
				<p className="animate-bounce">Loading...</p>
			</div>
		);

	return (
		<div className="text-black">
			<WeatherNavBar />
			<main className="max-w-7xl w-full mx-auto flex flex-col gap-9 pb-10 px-3 pt-4">
				{/* ----- Today Section ----- */}
				<section className="space-y-4 ">
					<div>
						<h2>
							<p>{format(parseISO(firstData?.dt_txt ?? ""), "yyyy.MM.dd EEEE")}</p>
						</h2>
						<WeatherContainer className="gap-10 px-6 items-center">
							<div className="flex flex-col px-4">
								{temperatureConverter(firstData?.main?.temp_max ?? 0)}°
							</div>
						</WeatherContainer>
					</div>
				</section>

				<section className="flex w-full flex-col gap-4  ">aaa</section>
			</main>
		</div>
	);
};

export default Weather;
