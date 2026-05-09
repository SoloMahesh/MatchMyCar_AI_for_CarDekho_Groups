import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MatchMyCar AI — Find Your Perfect Car in 60 Seconds",
  description:
    "AI-powered car recommendation engine that analyzes your lifestyle, budget, and driving habits to match you with the perfect automobile.",
  keywords: ["car recommendation", "AI", "car comparison", "best car finder"],
  openGraph: {
    title: "MatchMyCar AI — Find Your Perfect Car in 60 Seconds",
    description:
      "AI-powered car recommendations based on YOUR lifestyle, not just specs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Geist:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
