import Image from "next/image";

const Home = () => {
	return (
		<>
			<div className="flex flex-col h-screen">
				<div className="relative w-full h-1/6 flex justify-center items-center shadow-xl">
					<Image src="/images/gears.jpg" alt="home_header" layout="fill" objectFit="cover" className="z-0" />
				</div>
				{/* <div className="h-full border border-blue-600">Cia likes tekstas</div> */}
				<div className="h-5/6 bg-[#4e5b69]">Cia likes tekstas</div>
			</div>
		</>
	);
};

export default Home;
