/** @type {import('next').NextConfig} */
const nextConfig = {
    images :{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'porto-cms-production.up.railway.app',
            },
        ]
    },
    env:{
        GOOGLE_ID:"1234567890-1234567890-1234567890-1234567890",
        GOOGLE_SECRET:"1234567890-1234567890-1234567890-1234567890"
      }
}

module.exports = nextConfig
