/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'img.freepik.com'
			},
			{
				hostname: 'firebasestorage.googleapis.com'
			},
			{
				hostname: 'google.com'
			}
		]
	}
};

export default nextConfig;
