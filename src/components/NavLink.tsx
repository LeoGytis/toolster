import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface NavLinkProps {
	item: string | "";
	icon: ReactElement;
}

const NavLink = ({ icon, item }: NavLinkProps) => {
	const pathname = usePathname();
	const href = `/${item}`;

	return (
		<Link href={href}>
			<div
				className={`flex ${
					pathname === href ? "text-[#9acd32]" : "unset"
				}`}
			>
				{React.cloneElement(icon, { className: "mt-1 mr-4" })}
				<div className="hidden md:flex capitalize">{item}</div>
			</div>
		</Link>
	);
};

export default NavLink;
