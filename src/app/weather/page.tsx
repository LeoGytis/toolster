"use client";

import WeatherNavBar from "@/app/weather/components/WeatherTopBar";
import { WeatherDataProps } from "./types/weatherInterfaces";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { format } from "date-fns/format";
import { fromUnixTime, parseISO } from "date-fns";
import WeatherWrapper from "@/app/weather/components/WeatherWrapper";
import { temperatureConverter } from "@/app/weather/utils/temperatureConverter";
import WeatherIcon from "@/app/weather/components/WeatherIcon";
import { metersToKilometers } from "@/app/weather/utils/metersToKilometers";
import WeatherDetails from "@/app/weather/components/WeaterDetails";
import ForecastWeatherDetail from "@/app/weather/components/ForecastWeatherDetail";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "../atom";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

const Weather = () => {
	const [place, setPlace] = useAtom(placeAtom);
	const [loadingCity] = useAtom(loadingCityAtom);

	const { isPending, error, data, refetch } = useQuery<WeatherDataProps>({
		queryKey: ["repoData"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${API_KEY}&cnt=56`
			);
			console.log("🚀 ~ queryFn: ~ data:", data);
			return data;
		},
	});

	useEffect(() => {
		refetch();
	}, [place, refetch]);

	const firstData = data?.list[0];

	// ---- Filter Unique Dates -----
	const uniqueDatesNew = data?.list
		.map((entry) => new Date(entry.dt * 1000).toISOString().split("T")[0])
		.filter((date, index, self) => self.indexOf(date) === index);

	// Filtering data to get the first entry after 6:00 for each unique date
	const firstDataForEachDate = uniqueDatesNew?.map((date) => {
		return data?.list.find((entry) => {
			const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
			const entryTime = new Date(entry.dt * 1000).getHours();
			return entryDate === date && entryTime >= 6;
		});
	});

	if (isPending)
		return (
			<div className="flex items-center min-h-screen justify-center">
				<p className="animate-bounce">Loading...</p>
			</div>
		);

	if (error)
		return (
			<div className="flex items-center min-h-screen justify-center">
				{/* @ts-ignore */}
				<p className="text-red-600">{error.message}</p>
			</div>
		);

	return (
		<>
			<WeatherNavBar location={data?.city.name} />
			<main className="max-w-full w-full mx-auto flex flex-col gap-9 pb-10 px-3 pt-4">
				{/* ----- Today Section ----- */}
				<section className="space-y-4 ">
					<div className="space-y-2">
						<h2 className="flex gap-1 text-2xl items-end ">
							<p>{format(parseISO(firstData?.dt_txt ?? ""), "yyyy.MM.dd EEEE")}</p>
						</h2>
						<WeatherWrapper className="gap-10 px-6 items-center">
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
										<p>{temperatureConverter(d?.main.temp ?? 0)}°</p>
									</div>
								))}
							</div>
						</WeatherWrapper>
					</div>
					<div className=" flex gap-4">
						<WeatherWrapper className="w-fit  justify-center flex-col px-4 items-center ">
							<p className=" capitalize text-center">{firstData?.weather[0].description} </p>
							<WeatherIcon iconName={firstData?.weather[0].icon ?? ""} />
						</WeatherWrapper>
						<WeatherWrapper className="bg-yellow-300/80  px-6 gap-4 justify-between overflow-x-auto">
							<WeatherDetails
								visability={metersToKilometers(firstData?.visibility ?? 10000)}
								airPressure={`${firstData?.main.pressure} hPa`}
								humidity={`${firstData?.main.humidity}%`}
								sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702949452), "H:mm")}
								sunset={format(fromUnixTime(data?.city.sunset ?? 1702517657), "H:mm")}
								windSpeed={`${firstData?.wind.speed ?? 1.64} `}
							/>
						</WeatherWrapper>
						{/* right  */}
					</div>
				</section>
				{/* 7 day forcast data  */}
				<section className="flex w-full flex-col gap-4  ">
					<p className="text-2xl">Forcast (7 days)</p>
					{firstDataForEachDate?.map((d, i) => (
						<ForecastWeatherDetail
							key={i}
							description={d?.weather[0].description ?? ""}
							weatehrIcon={d?.weather[0].icon ?? "01d"}
							date={format(parseISO(d?.dt_txt ?? ""), "dd.MM")}
							day={format(parseISO(d?.dt_txt ?? ""), "EEEE")}
							feels_like={d?.main.feels_like ?? 0}
							temp={d?.main.temp ?? 0}
							temp_max={d?.main.temp_max ?? 0}
							temp_min={d?.main.temp_min ?? 0}
							airPressure={`${d?.main.pressure} hPa `}
							humidity={`${d?.main.humidity}% `}
							sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702517657), "H:mm")}
							sunset={format(fromUnixTime(data?.city.sunset ?? 1702517657), "H:mm")}
							visability={`${metersToKilometers(d?.visibility ?? 10000)} `}
							windSpeed={`${d?.wind.speed ?? 1.64} `}
						/>
					))}
				</section>
			</main>
		</>
	);
};

export default Weather;
