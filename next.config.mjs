const nextConfig = {
  images: {
    domains: ['127.0.0.1',"example.com", "dashboard.codeparrot.ai", "another-domain.com"],
  },
    serverRuntimeConfig: {
    //   https: {
    //     key: sslKey,
    //     cert: sslCert,
    //   },
    //   Will only be available on the server side
     secret: 'EpumSJrZ+pEyuKduZHIafPkFvByMXhqLRI7SIQ0GKoA=',
    //  secondSecret: process.env.SECOND_SECRET, // Pass through env variables
   },
  experimental: {
    turbo: {
      resolveAlias: {
        '@vercel/turbopack-next/internal/font/google/font': 'next/font/google'
      }
    }
  }
};

export default nextConfig;
