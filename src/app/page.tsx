"use client";
import MenuItem from "@/components/MenuItem";
import { navLinksData } from "@/components/NavMenu";
import Image from "next/image";

const Home = () => {
	return (
		<div className="flex flex-col h-screen bg-[#4e5b69]">
			<div className="relative w-full h-1/6 flex justify-center items-center shadow-xl">
				<Image
					src="/images/gears.jpg"
					alt="home_header"
					width={1000}
					height={563}
					className="w-full h-full object-cover z-0"
				/>
				<img src="/images/gears.jpg" alt="home_header" className="w-full h-full object-cover z-0" />
			</div>
			<div className="h-5/6 items-center p-8">
				<section className="flex gap-10 items-center flex-wrap">
					{navLinksData.map((link) => (
						<MenuItem key={link.item} item={link.item} icon={link.icon} />
					))}
				</section>
			</div>
		</div>
	);
};

export default Home;
