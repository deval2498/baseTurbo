/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    transpilePackages: ["@repo/ui", "@repo/typescript-config", "@repo/eslint-config"]
};

export default nextConfig;
