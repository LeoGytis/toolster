import { cn } from "@/app/weather/utils/cn";
import React from "react";
import { IoSearch } from "react-icons/io5";

type SearchBoxProps = {
	className?: string;
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
	onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

const SearchBox = (props: SearchBoxProps) => {
	return (
		<form
			onSubmit={props.onSubmit}
			className={cn("flex relative items-center justify-center h-10", props.className)}
		>
			<input
				type="text"
				value={props.value}
				onChange={props.onChange}
				placeholder="Search location.."
				className="px-4 py-1 text-sm w-60 border border-gray-300 rounded-l-md focus:outline-none  focus:border-blue-500 h-full"
			/>
			<button className="px-4 py-[6px] bg-[#9acd32] text-white rounded-r-md focus:outline-none hover:bg-[#7d9d3c] h-full">
				<IoSearch />
			</button>
		</form>
	);
};

export default SearchBox;
