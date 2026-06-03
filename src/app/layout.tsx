import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { siteMetadata } from "./metadata";
import "./globals.scss";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-main" });

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
