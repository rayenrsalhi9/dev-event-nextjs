import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import LightPillar from "@/components/LightPillar";
import "./globals.css";

const schibsted_grotesk = Schibsted_Grotesk({subsets: ["latin"],});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "The Hub for Every Dev Event You Can't Miss",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${schibsted_grotesk.className} antialiased`}>
        <div className="absolute min-h-screen inset-0 top-0 z-[-1]">
          <LightPillar
            topColor="#29d4ff"
            bottomColor="#2752d3"
            intensity={0.4}
            rotationSpeed={0.3}
            glowAmount={0.005}
            pillarWidth={3.0}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={50}
            interactive={false}
            mixBlendMode="normal"
          />
        </div>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
