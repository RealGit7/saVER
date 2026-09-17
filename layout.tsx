import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bermuda Saver",
  description: "Save money with Bermuda Price Watch, the Bermuda Price Index and community-powered offers.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-BM">
      <body className="antialiased">{children}</body>
    </html>
  );
}
