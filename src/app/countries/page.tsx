/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface CountryInfo {
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
	const [countriesData, setCountriesData] = useState<CountryInfo[] | null>(
		null
	);

	useEffect(() => {
		const fetchData = async () => {
			const options = {
				method: "GET",
				url: "https://restcountries.com/v3.1/all",
			};

			try {
				const response = await axios.request<CountryInfo[]>(options);
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
						<li key={index}>
							<strong> {country.name.common}</strong>
							<br />
							<img
								src={country.flags.png}
								alt={`Flag of ${country.name.common}`}
							/>
							<strong>Capital:</strong> {country.capital}
							<br />
							<strong>Area:</strong> {country.area}
							<br />
							<strong>Population:</strong> {country.population}
							<br />
							<strong>Flag:</strong> <br />
							<strong>Google Maps:</strong> <br />
							<strong>OpenStreet Maps:</strong>{" "}
						</li>
					))}
				</ul>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Countries;
