import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavMenu from "../components/NavMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Toolster",
	description: "Toolster | Tools to manage your time and productivity",
	icons: {
		icon: "/images/toolster_favicon.ico",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="mx-auto min-h-screen flex items-center justify-center">
					<div className="flex w-full">
						<header className="hidden sm:flex w-72">
							<NavMenu />
						</header>
						<main className="flex flex-col w-full py-8 px-4">
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
