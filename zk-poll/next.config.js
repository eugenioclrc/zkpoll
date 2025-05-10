/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Handle Gun.js dynamic requires
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };

    // Exclude Gun.js from server-side rendering
    if (isServer) {
      config.externals.push({
        'gun': 'commonjs gun',
        'gun/sea': 'commonjs gun/sea',
      });
    }

    return config;
  },
};

module.exports = nextConfig; 