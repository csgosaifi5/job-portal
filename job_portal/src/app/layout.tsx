import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATS Job Portal",
  description: "ATS Job Portal is a job portal for ATS company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/plugins.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/templete.css" />
        <link rel="stylesheet" href="/css/skin/skin-1.css" />
        <link rel="stylesheet" href="/plugins/slick/slick.min.css" />
        <link rel="stylesheet" href="/plugins/slick/slick-theme.min.css" />
      </head>

      <body>{children}</body>
    </html>
  );
}
