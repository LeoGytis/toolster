"use client";

import WeatherTopBar from "@/app/weather/components/WeatherTopBar";
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
import WeatherDetails from "@/app/weather/components/WeatherDetails";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "../atom";

// const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
const API_KEY = 'bd363a0a91d6c85203270ce61960c38a';

const Weather = () => {
	const [place, setPlace] = useAtom(placeAtom);
	const [loadingCity] = useAtom(loadingCityAtom);

	const { isPending, error, data, refetch } = useQuery<WeatherDataProps>({
		queryKey: ["repoData"],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${API_KEY}&cnt=56`
			);
			console.log("🚀 ~ DATA HERE:", data);
			return data;
		},
	});

	useEffect(() => {
		refetch();
	}, [place, refetch]);

	const todaysData = data?.list[0];
	const uniqueDates: string[] = [];

	if (data?.list) {
		uniqueDates.push(
			...data.list.reduce((dates: string[], entry) => {
				const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
				if (!dates.includes(entryDate)) {
					dates.push(entryDate);
				}
				return dates;
			}, [])
		);
	}

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
			<WeatherTopBar location={data?.city.name} />
			<main className="max-w-full w-full mx-auto flex flex-col gap-4 pb-10 px-3 pt-4 bg-gray-100">
				{/* ----- Today Section ----- */}
				<section className="space-y-4">
					<WeatherWrapper className="flex justify-between gap-16 bg-[#acca70] px-6">
						<div className="flex gap-4">
							<h2 className="flex flex-col items-center text-base">
								<span>{format(parseISO(todaysData?.dt_txt ?? ""), "yyyy.MM.dd")}</span>
								<span>{format(parseISO(todaysData?.dt_txt ?? ""), "EEEE")}</span>
							</h2>
							<div className="flex gap-2 items-center">
								<WeatherIcon iconname={todaysData?.weather[0].icon ?? ""} />
								<span className="text-2xl">{temperatureConverter(todaysData?.main.temp ?? 0)}°</span>
							</div>
						</div>

						<WeatherDetails
							sunrise={format(fromUnixTime(data?.city.sunrise ?? 0), "H:mm")}
							sunset={format(fromUnixTime(data?.city.sunset ?? 0), "H:mm")}
							windSpeed={`${todaysData?.wind.speed ?? 0} m/s`}
							airPressure={`${todaysData?.main.pressure} hPa`}
							visibility={`${metersToKilometers(todaysData?.visibility ?? 0)} `}
							humidity={`${todaysData?.main.pressure ?? 0} hPa`}
						/>
					</WeatherWrapper>
					{/* ----- Today's Forecast Section ----- */}
					<WeatherWrapper className="px-6">
						<div className="w-full justify-between  overflow-x-auto flex gap-2 sm:gap-6">
							{data?.list.slice(0, 9).map((d, i) => (
								<div key={i} className="flex flex-col items-center text-xs font-semibold ">
									<p className="whitespace-nowrap">{format(parseISO(d.dt_txt), "HH:mm")}</p>
									<WeatherIcon iconname={d.weather[0].icon} />
									<p>{temperatureConverter(d?.main.temp ?? 0)}°</p>
									<p>{d?.wind.speed ?? 0} m/s</p>
								</div>
							))}
						</div>
					</WeatherWrapper>
				</section>
				{/* ----- 7 Days Forcast Section ----- */}
				<section className="flex w-full flex-col gap-4  ">
					<p className="text-2xl">Forcast (7 days)</p>

					{uniqueDates.slice(1).map((date, index) => {
						const dayData = data?.list
							.filter((entry) => {
								const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
								return entryDate === date;
							})
							.slice(0, 9);

						return (
							<WeatherWrapper key={index} className="px-6">
								<div className="w-full justify-between overflow-x-auto flex gap-2 sm:gap-6">
									{dayData?.map((d, i) => (
										<div key={i} className="flex flex-col items-center text-xs font-semibold">
											<p className="whitespace-nowrap">{format(parseISO(d.dt_txt), "HH:mm")}</p>
											<WeatherIcon iconname={d.weather[0].icon} />
											<p>{temperatureConverter(d?.main.temp ?? 0)}°</p>
											<p>{d?.wind.speed ?? 0} m/s</p>
										</div>
									))}
								</div>
							</WeatherWrapper>
						);
					})}
				</section>
			</main>
		</>
	);
};

export default Weather;
