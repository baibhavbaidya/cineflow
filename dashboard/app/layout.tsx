import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CineFlow — Media Analytics",
  description: "Real-time media analytics pipeline powered by TMDB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}