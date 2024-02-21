/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

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

	useEffect(() => {
		const fetchData = async () => {
			const options = {
				method: "GET",
				url: "https://restcountries.com/v3.1/all",
			};

			try {
				const response = await axios.request<CountryProps[]>(options);
				setCountriesData(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="text-black">
			{countriesData ? (
				<ul className="flex gap-10 flex-wrap pt-10">
					{countriesData.map((country, index) => (
						<CountryWrapper country={country} key={index} />
					))}
				</ul>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Countries;

const CountryWrapper = ({ country, key }: { country: CountryProps; key: number }) => {
	return (
		<li key={key} className="flex flex-col items-center">
			<h1 className="text-lg ">{country.name.common}</h1>
			<div className="w-72">
				<img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
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
