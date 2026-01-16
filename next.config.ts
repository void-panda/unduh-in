import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@distube/ytdl-core",
    "@mrnimax/tiktok_downloader",
    "fb-downloader-scrapper",
    "instagram-url-direct",
  ],
};

export default nextConfig;
