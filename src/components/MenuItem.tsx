import React, { ReactElement } from "react";
import Link from "next/link";

interface NavLinkProps {
	item: string | "";
	icon: ReactElement;
}

const MenuItem = ({ icon, item }: NavLinkProps) => {
	const href = `/${item}`;

	return (
		<Link
			href={href}
			className="w-40 flex flex-col gap-8 items-center text-[#9acd32] hover:text-[#99cd3286] border border-gray-500 rounded-lg shadow-lg hover:shadow-xl bg-gray-800 px-10 py-4"
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

export default MenuItem;
