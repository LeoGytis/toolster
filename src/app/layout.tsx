import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavMenu from "./components/NavMenu";
import MainBoard from "./components/MainBoard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Toolster | Tools to manage your time and productivity",
	description: "Toolster | Tools to manage your time and productivity",
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
						<header className="hidden sm:flex w-1/6">
							<NavMenu />
						</header>
						<main className="flex flex-col w-full">
							{/* <MainBoard /> */}
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
