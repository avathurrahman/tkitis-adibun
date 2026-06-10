import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Website kenangan Adibun adalah situs statis murni.
  // `output: "export"` menghasilkan folder `out/` yang langsung dibaca Cloudflare Pages.
  output: "export",
  // Wajib untuk static export karena tidak ada server pengoptimasi gambar.
  images: { unoptimized: true },
};

export default nextConfig;
