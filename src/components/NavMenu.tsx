"use client";
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
import Link from "next/link";
import NavLink from "./NavLink";

const NavMenu: any = () => {
	return (
		<div className="h-screen w-full bg-[#171F32] text-gray-400 border-r-2 border-[#9acd32] px-4 lg:px-6">
			<div className="flex flex-col gap-4">
				<Link href="/">
					<h1 className="flex justify-center text-xl text-[#9acd32] font-bold py-10">
						Toolster
					</h1>
				</Link>
				<nav className="flex flex-col gap-6 items-center md:items-start ps-0 md:ps-2">
					<NavLink item={"weather"} icon={<TiWeatherPartlySunny />} />
					<NavLink item={"time-tracker"} icon={<MdOutlineTimer />} />
					<NavLink item={"dashboard"} icon={<BiSolidDashboard />} />
					<NavLink item={"mobiles"} icon={<FaMobileRetro />} />
					<NavLink item={"countries"} icon={<FaGlobeAmericas />} />
					<NavLink item={"cars"} icon={<IoCarSharp />} />
					<NavLink item={"social-media"} icon={<FaMobileRetro />} />
					<div className="flex">
						<MdPersonSearch className="mt-1 mr-4 color-red" />
						<div className="hidden md:flex">Recruitment</div>
					</div>
					<div className="flex">
						<BsCalendar3 className="mt-1 mr-4" />
						<div className="hidden md:flex">Schedule</div>
					</div>
					<div className="flex">
						<FaPeopleGroup className="mt-1 mr-4" />
						<div className="hidden md:flex"> Employee</div>
					</div>
					<div className="flex">
						<PiCirclesThreeBold className="mt-1 mr-4" />
						<div className="hidden md:flex">Department</div>
					</div>
					<div className="flex">
						<IoSettingsSharp className="mt-1 mr-4" />
						<div className="hidden md:flex">Settings</div>
					</div>
				</nav>
			</div>
		</div>
	);
};

export default NavMenu;
