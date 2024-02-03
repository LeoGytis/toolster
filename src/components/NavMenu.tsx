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
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMenu: any = () => {
	const pathname = usePathname();

	return (
		<div className="h-screen w-full bg-[#171F32] border-r-2 border-[#9acd32] px-4 lg:px-6">
			<div className="flex flex-col gap-10 justify-between lg:h-5/6 text-gray-400">
				<div>
					<h1 className="flex justify-center text-xl text-[#9acd32] font-bold py-10">
						Toolster
					</h1>
					<div className="flex flex-col gap-6 items-center lg:items-start mb-10">
						<Link href="/dashboard">
							<div
								className={`flex ${
									pathname === "/dashboard"
										? "text-[#9acd32]"
										: "unset"
								}`}
							>
								<BiSolidDashboard className="mt-1 mr-4" />
								<div className="hidden lg:flex">Dashboard</div>
							</div>
						</Link>
						<Link href="/mobiles">
							<div
								className={`flex ${
									pathname === "/mobiles"
										? "text-[#9acd32]"
										: "unset"
								}`}
							>
								<FaMobileRetro className="mt-1 mr-4" />
								<div className="hidden lg:flex">Mobiles</div>
							</div>
						</Link>
						<Link href="/countries">
							<div
								className={`flex ${
									pathname === "/countries"
										? "text-[#9acd32]"
										: "unset"
								}`}
							>
								<FaGlobeAmericas className="mt-1 mr-4" />
								<div className="hidden lg:flex">Countries</div>
							</div>
						</Link>
						<Link href="/cars">
							<div
								className={`flex ${
									pathname === "/cars"
										? "text-[#9acd32]"
										: "unset"
								}`}
							>
								<IoCarSharp className="mt-1 mr-4" />
								<div className="hidden lg:flex">Cars</div>
							</div>
						</Link>{" "}
						<Link href="/social-media">
							<div
								className={`flex ${
									pathname === "/social-media"
										? "text-[#9acd32]"
										: "unset"
								}`}
							>
								<FaMobileRetro className="mt-1 mr-4" />
								<div className="hidden lg:flex">
									Social Media
								</div>
							</div>
						</Link>
						<div className="flex">
							<MdPersonSearch className="mt-1 mr-4 color-red" />
							<div className="hidden lg:flex">Recruitment</div>
						</div>
						<div className="flex">
							<BsCalendar3 className="mt-1 mr-4" />
							<div className="hidden lg:flex">Schedule</div>
						</div>
						<div className="flex">
							<FaPeopleGroup className="mt-1 mr-4" />
							<div className="hidden lg:flex"> Employee</div>
						</div>
						<div className="flex">
							<PiCirclesThreeBold className="mt-1 mr-4" />
							<div className="hidden lg:flex">Department</div>
						</div>
						<div className="flex">
							<IoSettingsSharp className="mt-1 mr-4" />
							<div className="hidden lg:flex">Settings</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavMenu;
