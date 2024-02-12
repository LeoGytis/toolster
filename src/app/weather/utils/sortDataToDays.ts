import { WeatherDataProps } from "../types/weatherInterfaces";

const sortDataToDays = (data: WeatherDataProps) => {
	// Extracting unique dates from data
	const uniqueDates = data?.list
		.map((entry) => new Date(entry.dt * 1000).toISOString().split("T")[0])
		.filter((date, index, self) => self.indexOf(date) === index);

	// Filtering data to get the first entry on 00:00 for each unique date
	const firstDataForEachDate = uniqueDates?.map((date) => {
		return data?.list.find((entry) => {
			const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
			const entryTime = new Date(entry.dt * 1000).getHours();
			return entryDate === date && entryTime >= 0;
		});
	});

	return firstDataForEachDate;
};

export default sortDataToDays;
