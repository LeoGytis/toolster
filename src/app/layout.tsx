import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavMenu from "../components/NavMenu";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Provider } from "jotai";
import TanStackProvider from "./weather/utils/TanStackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Toolster",
	description: "Toolster | Tools to manage your time and productivity",
	icons: {
		icon: "/images/toolster_favicon.ico",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();
	return (
		<html lang="en">
			<TanStackProvider>
				<body className={inter.className}>
					<div className="mx-auto min-h-screen flex items-center justify-center">
						<div className="flex w-full">
							<header className=" hidden sm:flex w-2/12">
								<NavMenu />
							</header>
							<main className="w-10/12">{children}</main>
						</div>
					</div>
				</body>
			</TanStackProvider>
		</html>
	);
}
