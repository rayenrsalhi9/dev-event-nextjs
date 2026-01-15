import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";
import "./globals.css";

const schibsted_grotesk = Schibsted_Grotesk({subsets: ["latin"],});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "The Hub for Every Dev Event You Can't Miss",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${schibsted_grotesk.className} antialiased bg-gradient-to-b from-[#0a1929] via-[#050a14] to-[#020408]`}>
        <Providers>
          <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
            <LightRays
              raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={1.2}
              lightSpread={1}
              rayLength={3}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays"
            />
          </div>
          <main>
            <Navbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}