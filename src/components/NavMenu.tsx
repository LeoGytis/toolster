"use client";
import React, { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSolidDashboard } from "react-icons/bi";
import { MdPersonSearch } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiCirclesThreeBold } from "react-icons/pi";
import { IoSettingsSharp } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import { FaMobileRetro } from "react-icons/fa6";
import { IoCarSharp } from "react-icons/io5";
import { FaGlobeAmericas } from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdOutlineTimer } from "react-icons/md";

export const navLinksData = [
	{ item: "weather", icon: <TiWeatherPartlySunny /> },
	{ item: "time-tracker", icon: <MdOutlineTimer /> },
	{ item: "dashboard", icon: <BiSolidDashboard /> },
	{ item: "mobiles", icon: <FaMobileRetro /> },
	{ item: "countries", icon: <FaGlobeAmericas /> },
	{ item: "cars", icon: <IoCarSharp /> },
	{ item: "social-media", icon: <FaMobileRetro /> },
	{ item: "recruitment", icon: <MdPersonSearch /> },
	{ item: "schedule", icon: <BsCalendar3 /> },
	{ item: "employee", icon: <FaPeopleGroup /> },
	{ item: "department", icon: <PiCirclesThreeBold /> },
	{ item: "settings", icon: <IoSettingsSharp /> },
];

const NavMenu: any = () => {
	return (
		<div className="sticky top-0 left-0 h-screen w-full bg-[#171F32] text-gray-400 border-r-2 border-[#9acd32] px-4 lg:px-6">
			<div className="flex flex-col gap-4">
				<Link href="/">
					<h1 className="flex justify-center text-xl text-[#9acd32] font-bold pt-10 pb-4">Toolster</h1>
				</Link>
				<nav className="flex flex-col gap-6 items-center md:items-start ps-0 md:ps-2">
					{navLinksData.map((link) => (
						<NavLink key={link.item} item={link.item} icon={link.icon} />
					))}
				</nav>
			</div>
		</div>
	);
};

export default NavMenu;

interface NavLinkProps {
	item: string | "";
	icon: ReactElement;
}

const NavLink = ({ icon, item }: NavLinkProps) => {
	const pathname = usePathname();
	const href = `/${item}`;

	return (
		<Link href={href}>
			<div className={`flex ${pathname === href ? "text-[#9acd32]" : "unset"}`}>
				{React.cloneElement(icon, { className: "mt-1 mr-4" })}
				<div className="hidden md:flex capitalize">{item}</div>
			</div>
		</Link>
	);
};
