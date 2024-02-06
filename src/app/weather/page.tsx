"use client";

import WeatherNavBar from "@/components/WeatherNavBar";
import { useEffect, useState } from "react";

const Weather = () => {
	return (
		<div className="text-black">
			<WeatherNavBar />
		</div>
	);
};

export default Weather;
