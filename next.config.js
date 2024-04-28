/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "fakestoreapi.com",
      "images.unsplash.com",
      "*.*",
      "res.cloudinary.com",
      "upload.wikimedia.org",
      "cdns-images.dzcdn.net",
      "api.daavkatunes.mn",
      "static-cdn.jtvnw.net",
      "news.mn",
      "scontent.cdninstagram.com",
    ],
  },
};

module.exports = nextConfig;
