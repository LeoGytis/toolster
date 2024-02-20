/** @type {import('next').NextConfig} */

const nextConfig = {
	basePath: "/toolster",
	output: "export",
	images: {
		// unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "openweathermap.org",
			},
		],
	},
};

// To deployt 2024-02-16 comments these two lines in file nextjs.yml
// # - name: Static HTML export with Next.js  // commented so it would build
// # run: ${{ steps.detect-package-manager.outputs.runner }} next export

module.exports = nextConfig;
