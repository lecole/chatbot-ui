const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const withPWA = require("next-pwa")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost"
      },
      {
        protocol: "http",
        hostname: "127.0.0.1"
      },
      {
        protocol: "http",
        hostname: "192.168.*.*"
      },
      {
        protocol: "http",
        hostname: "10.*.*.*"
      },
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ["sharp", "onnxruntime-node"]
  }
}

module.exports = withBundleAnalyzer(
  withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development"
  })(nextConfig)
)

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true"
// })
//
// const withPWA = require("next-pwa")({
//   dest: "public"
// })
//
// module.exports = withBundleAnalyzer(
//   withPWA({
//     reactStrictMode: true,
//     images: {
//       remotePatterns: [
//         {
//           protocol: "http",
//           hostname: "localhost"
//         },
//         {
//           protocol: "http",
//           hostname: "127.0.0.1"
//         },
//         {
//           protocol: "https",
//           hostname: "**"
//         }
//       ]
//     },
//     experimental: {
//       serverComponentsExternalPackages: ["sharp", "onnxruntime-node"]
//     }
//   })
// )
