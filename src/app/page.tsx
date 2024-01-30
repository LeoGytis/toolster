import Image from "next/image";
import NavMenu from "./components/NavMenu";
import MainBoard from "./components/MainBoard";

export default function Home() {
	return (
		<div className="mx-auto min-h-screen flex items-center justify-center">
			<div className="flex w-full">
				<header className="hidden sm:flex w-1/6">
					<NavMenu />
				</header>
				<main className="flex flex-col w-full">
					<MainBoard />
				</main>
			</div>
		</div>
	);
}
