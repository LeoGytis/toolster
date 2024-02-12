"use client";
import { navLinksData } from "@/components/NavMenu";
import Image from "next/image";
import React, { ReactElement } from "react";
import Link from "next/link";

const Home = () => {
	return (
		<div className="flex flex-col h-screen bg-[#4e5b69]">
			<div className="relative w-full h-1/6 flex justify-center items-center shadow-xl">
				<Image src="/images/gears.jpg" alt="home_header" layout="fill" objectFit="cover" className="z-0" />
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

interface NavLinkProps {
	item: string | "";
	icon: ReactElement;
}

const MenuItem = ({ icon, item }: NavLinkProps) => {
	const href = `/${item}`;

	return (
		<Link
			href={href}
			className="w-40 max-h-32 flex flex-col gap-8 items-center text-[#9acd32] hover:text-[#99cd3286] border radius-sm border-gray-500 shadow-xl ring-4 ring-gray-500 bg-gray-800 px-10 py-4"
		>
			{React.cloneElement(icon, { className: "h-16 w-20" })}
			<div className="capitalize whitespace-no-wrap text-center">
				{item
					.split("-")
					.map((word) => word.charAt(0) + word.slice(1))
					.join(" ")}
			</div>
		</Link>
	);
};
