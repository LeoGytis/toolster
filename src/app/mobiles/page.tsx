const Mobiles = async () => {
	const axios = require("axios");

	const options = {
		method: "GET",
		url: "https://mobile-phone-specs-database.p.rapidapi.com/gsm/all-brands",
		headers: {
			"X-RapidAPI-Key":
				"a4d147ba13msh758ab152cab110ap1803d1jsn95e87482c1bf",
			"X-RapidAPI-Host": "mobile-phone-specs-database.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}

	return (
		<div className="w-full h-full bg-orange-300  text-black lg:px-6">
			This is going to be a mobile spot
			{/* {labas} */}
		</div>
	);
};

export default Mobiles;
