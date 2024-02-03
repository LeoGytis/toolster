"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface BrandInfo {
	brand: {
		name: string;
		website: string;
	};
	logo: {
		jpg: string;
	};
	_id: string;
	__v: number;
}

const MobileBrands = () => {
	const [brandsData, setBrandsData] = useState<BrandInfo[] | null>(null);

	// const options = {
	// 	method: 'POST',
	// 	headers: {accept: 'application/json', 'content-type': 'application/json'},
	// 	body: JSON.stringify({category: ['Smartphones'], from: '2022-01-30'})
	// };

	// fetch('https://api.techspecs.io/v4/all/products/?page=0', options)
	// 	.then(response => response.json())
	// 	.then(response => console.log(response))
	// 	.catch(err => console.error(err));

	useEffect(() => {
		const fetchData = async () => {
			// const options = {
			// 	method: "GET",
			// 	headers: {
			// 		accept: "application/json",
			// 		Authorization:
			// 			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c19QVWdoaWswQlM0TEwzaCIsIm1vZXNpZlByaWNpbmdJZCI6InByaWNlXzFNUXF5dkJESWxQbVVQcE1SWUVWdnlLZSIsImlhdCI6MTcwNjk1OTQzMX0.3hqntK0u9jTFEPKGfk_s4C4x0mXN5QPTsjqWTjrhyp8",
			// 	},
			// };

			const options = {
				method: "POST",
				headers: {
					accept: "application/json",
					"content-type": "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c19QVWdoaWswQlM0TEwzaCIsIm1vZXNpZlByaWNpbmdJZCI6InByaWNlXzFNUXF5dkJESWxQbVVQcE1SWUVWdnlLZSIsImlhdCI6MTcwNjk1OTQzMX0.3hqntK0u9jTFEPKGfk_s4C4x0mXN5QPTsjqWTjrhyp8",
				},
				body: JSON.stringify({
					category: ["Smartphones"],
					from: "2022-01-30",
				}),
			};

			try {
				const response = await fetch(
					"https://api.techspecs.io/v4/all/products/?page=0",
					options
				);
				const data = await response.json();
				console.log(data);
				setBrandsData(data.data.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="text-black">
			{brandsData ? (
				<ul className="flex gap-10 flex-wrap pt-10">
					{brandsData.map((brand, index) => (
						<li key={index}>
							<strong>{brand.brand.name}</strong>
							<br />
							<img
								src={brand.logo.jpg}
								alt={`Logo of ${brand.brand.name}`}
							/>
							<br />
							<strong>Website:</strong>{" "}
							<a href={brand.brand.website}>
								{brand.brand.website}
							</a>
						</li>
					))}
				</ul>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default MobileBrands;
