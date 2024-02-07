import { cn } from "@/app/weather/utils/cn";
import React from "react";

type Props = {};

const WeatherWrapper = (props: React.HTMLProps<HTMLDivElement>) => {
	return <div {...props} className={cn("w-full bg-white border rounded-md flex py-4 shadow-sm", props.className)} />;
};

export default WeatherWrapper;
