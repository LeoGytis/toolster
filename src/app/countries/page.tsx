/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface CountryProps {
	name: {
		common: string;
	};
	capital: string[];
	area: number;
	population: number;
	flags: {
		png: string;
	};
	mapImage: {
		googleMaps: string;
		openStreetMaps: string;
	};
}

const Countries = () => {
	const [countriesData, setCountriesData] = useState<CountryProps[] | null>(null);

	const { isPending, error, data, refetch } = useQuery<CountryProps>({
		queryKey: ["repoData"],
		queryFn: async () => {
			const { data } = await axios.get("https://restcountries.com/v3.1/all");
			setCountriesData(data);
			return data;
		},
	});

	// useEffect(() => {
	// 	refetch();
	// }, [refetch]);

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
		<ul className="flex justify-center gap-10 flex-wrap text-black bg-[#4e5b69] px-4 pt-10">
			{countriesData?.map((country, index) => (
				<CountryWrapper country={country} key={index} />
			))}
		</ul>
	);
};

export default Countries;

const CountryWrapper = ({ country, key }: { country: CountryProps; key: number }) => {
	return (
		<li key={key} className="flex flex-col items-center text-white rounded-lg bg-gray-800 px-8 py-2">
			<h1 className="text-lg pb-2">{country.name.common}</h1>
			<div className="w-72 max-h-44 pb-2">
				<img
					src={country.flags.png}
					alt={`Flag of ${country.name.common}`}
					className="w-full h-full object-contain"
				/>
			</div>
			<div>
				<strong>Capital:</strong> {country.capital}
			</div>
			<div>
				<strong>Area:</strong> {country.area}
			</div>
			<div>
				<strong>Population:</strong> {country.population}
			</div>
		</li>
	);
};
