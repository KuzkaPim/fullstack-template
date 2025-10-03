import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    sassOptions: {
        additionalData: `
@use "sass:color";
@use "src/styles/variables.sass" as *;
        `,
    },
};

export default nextConfig;
