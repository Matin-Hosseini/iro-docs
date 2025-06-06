import Providers from "@/providers";
import localFont from "next/font/local";
import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سامانه ایران اورجینال",
  description: "محاسبه گر و سامانه بارگزاری مدارک ایران اورجینال",
};

const danaFont = localFont({
  src: [
    {
      path: "/fonts/dana/fa-num/DanaFaNum-Regular.ttf",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--dana-font",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${danaFont.className} ${danaFont.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
