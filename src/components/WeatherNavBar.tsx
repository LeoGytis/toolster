import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
// import SearchBox from "./SearchBox";
import { useState } from "react";
import axios from "axios";
import SearchBox from "./SearchBox";
// import { loadingCityAtom, placeAtom } from "@/app/atom";
// import { useAtom } from "jotai";

const WeatherNavBar = () => {
	return (
		<nav className="shadow-sm  sticky top-0 left-0 z-50 bg-gray-200">
			<div className="h-20 w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
				<p className="flex items-center justify-center gap-2  ">
					<h2 className="text-gray-500 text-3xl">Weather</h2>
					<MdWbSunny className="text-3xl mt-1 text-[#9acd32]" />
				</p>
				<section className="flex gap-2 items-center">
					<MdMyLocation
						// title="Your Current Location"
						// onClick={handleCurrentLocation}
						className="text-2xl  text-gray-400 hover:opacity-80 cursor-pointer"
					/>
					<MdOutlineLocationOn className="text-3xl" />
					<p className="text-slate-900/80 text-sm"> Lietuva </p>
				</section>
				<div>
					{/* <SearchBox /> */}
					{/* <SearchBox
                value={city}
                onSubmit={handleSubmiSearch}
                onChange={(e) => handleInputChang(e.target.value)}
              /> */}
				</div>
			</div>
		</nav>
	);
};

export default WeatherNavBar;
