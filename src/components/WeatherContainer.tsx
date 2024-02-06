import { cn } from "@/utils/cn";
import React from "react";

type Props = {};

const WeatherContainer = (props: React.HTMLProps<HTMLDivElement>) => {
	return <div {...props} className={cn("w-full bg-white border rounded-xl flex py-4 shadow-sm", props.className)} />;
};

export default WeatherContainer;
