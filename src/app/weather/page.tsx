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
import ForecastWeatherDetail from "@/app/weather/components/ForecastWeatherDetail";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "../atom";
import { MdOutlineLocationOn } from "react-icons/md";
import sortDataToDays from "./utils/sortDataToDays";

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
			console.log("🚀 ~ DATA HERE:", data);
			return data;
		},
	});

	// async function getUsers() {
	// 	return (await fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json())) as any[];
	// }

	// const { data } = useQuery<any[]>({
	// 	queryKey: ["stream-hydrate-users"],
	// 	queryFn: () => getUsers(),
	// 	suspense: true,
	// 	staleTime: 5 * 1000,
	// });

	// const { isPending, error, data, refetch } = useQuery<WeatherDataProps>({
	// 	queryKey: ["repoData"],
	// 	queryFn: async () => {
	// 		const { data } = await axios.get(
	// 			`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${API_KEY}&cnt=56`
	// 		);
	// 		console.log("🚀 ~ DATA HERE:", data);
	// 		return data;
	// 	},
	// });

	useEffect(() => {
		refetch();
	}, [place, refetch]);

	const todaysData = data?.list[0];

	// const uniqueDates = data?.list.map((entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]);

	// const uniqueDatesArray: string[] = [];
	// uniqueDates?.forEach((date) => {
	// 	uniqueDatesArray.push(date);
	// });
	// const weatherWrappers: JSX.Element[] = [];

	// // Render each day's data and store WeatherWrapper components in the array
	// uniqueDatesArray.forEach((date, index) => {
	// 	// Filter data for the current date
	// 	const dayData = data?.list
	// 		.filter((entry) => {
	// 			const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
	// 			return entryDate === date;
	// 		})
	// 		.slice(0, 9); // Slice to get first 9 entries for each day

	// 	// Render WeatherWrapper component
	// 	const weatherWrapper = (
	// 		<WeatherWrapper key={index} className="px-6">
	// 			<div className="w-full justify-between overflow-x-auto flex gap-2 sm:gap-6">
	// 				{dayData?.map((d, i) => (
	// 					<div key={i} className="flex flex-col items-center text-xs font-semibold">
	// 						<p className="whitespace-nowrap">{format(parseISO(d.dt_txt), "HH:mm")}</p>
	// 						<WeatherIcon iconname={d.weather[0].icon} />
	// 						<p>{temperatureConverter(d?.main.temp ?? 0)}°</p>
	// 						<p>{d?.wind.speed ?? 0} m/s</p>
	// 					</div>
	// 				))}
	// 			</div>
	// 		</WeatherWrapper>
	// 	);

	// 	// Push WeatherWrapper component to the array
	// 	weatherWrappers.push(weatherWrapper);
	// });

	// const firstDataForEachDate = data ? sortDataToDays(data) : undefined;

	const naujaData = data ? sortDataToDays(data) : undefined;
	console.log("🚀 ~ Weather ~ naujaData -->:", naujaData);

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
					{/* {weatherWrappers} */}
					{/* {firstDataForEachDate?.map((d, i) => (
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
							visibility={`${metersToKilometers(d?.visibility ?? 10000)} `}
							windSpeed={`${d?.wind.speed ?? 1.64} m/s`}
						/>
					))} */}
				</section>
			</main>
		</>
	);
};

export default Weather;
