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
		<div className="sticky top-0 left-0 h-screen w-full bg-[#171F32] text-gray-400 border-r-2 border-[#9acd32] px-4 lg:px-6">
			<div className="flex flex-col gap-4">
				<Link href="/">
					<h1 className="flex justify-center text-xl text-[#9acd32] font-bold pt-10 pb-4">Toolster</h1>
				</Link>
				<nav className="flex flex-col gap-6 items-center md:items-start ps-0 md:ps-2">
					<NavLink item={"weather"} icon={<TiWeatherPartlySunny />} />
					<NavLink item={"time-tracker"} icon={<MdOutlineTimer />} />
					<NavLink item={"dashboard"} icon={<BiSolidDashboard />} />
					<NavLink item={"mobiles"} icon={<FaMobileRetro />} />
					<NavLink item={"countries"} icon={<FaGlobeAmericas />} />
					<NavLink item={"cars"} icon={<IoCarSharp />} />
					<NavLink item={"social-media"} icon={<FaMobileRetro />} />
					<NavLink item={"recruitment"} icon={<MdPersonSearch />} />
					<NavLink item={"schedule"} icon={<BsCalendar3 />} />
					<NavLink item={"employee"} icon={<FaPeopleGroup />} />
					<NavLink item={"department"} icon={<PiCirclesThreeBold />} />
					<NavLink item={"settings"} icon={<IoSettingsSharp />} />
				</nav>
			</div>
		</div>
	);
};

export default NavMenu;
