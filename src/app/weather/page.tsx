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
import WeatherIcon from "@/components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNight";

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
					<div className="space-y-2">
						<h2 className="flex gap-1 text-2xl items-end ">
							<p>{format(parseISO(firstData?.dt_txt ?? ""), "yyyy.MM.dd EEEE")}</p>
						</h2>
						<WeatherContainer className="gap-10 px-6 items-center">
							<div className=" flex flex-col px-4 ">
								<span className="text-5xl">
									{temperatureConverter(firstData?.main.temp ?? 296.37)}°
								</span>
								<p className="text-xs space-x-1 whitespace-nowrap">
									<span> Feels like</span>
									<span>{temperatureConverter(firstData?.main.feels_like ?? 0)}°</span>
								</p>
								<p className="text-xs space-x-2">
									<span>
										{temperatureConverter(firstData?.main.temp_min ?? 0)}
										°↓
									</span>
									<span>
										{temperatureConverter(firstData?.main.temp_max ?? 0)}
										°↑
									</span>
								</p>
							</div>
							{/* ----- Today's Forecast Section ----- */}
							<div className="w-full overflow-x-auto flex gap-10 sm:gap-16 justify-between pr-3">
								{data?.list.map((d, i) => (
									<div
										key={i}
										className="flex flex-col justify-between gap-2 items-center text-xs font-semibold "
									>
										<p className="whitespace-nowrap">{format(parseISO(d.dt_txt), "h:mm a")}</p>

										<WeatherIcon iconName={d.weather[0].icon} />
										<WeatherIcon iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)} />
										<p>{temperatureConverter(d?.main.temp ?? 0)}°</p>
									</div>
								))}
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
