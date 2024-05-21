//next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["127.0.0.1", "nyc3.digitaloceanspaces.com"],
  },
  // ... other Next.js configurations ...
};

const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.alias['@/components'] = path.resolve(
      __dirname,
      'components',
    );

    config.resolve.alias['@/services'] = path.resolve(__dirname, 'services');
    config.resolve.alias['@/store'] = path.resolve(__dirname, 'store');
    config.resolve.alias['@/app'] = path.resolve(__dirname, 'app');
    // Add other aliases if necessary
    return config;
  },

  compiler: {
    removeConsole: true,
  },

  babel: {
    plugins: [
      [
        'transform-remove-console',
        {
          exclude: ['error', 'warn'],
        },
      ],
    ],
  },
};

module.exports = nextConfig;
