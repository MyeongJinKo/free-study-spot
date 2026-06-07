import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "무료 공부 장소",
    template: "%s | 무료 공부 장소",
  },
  description: "도서관, 청년센터, 주민센터 등 무료로 이용할 수 있는 공부 공간을 찾아보세요.",
  keywords: ["무료공부장소", "도서관", "청년센터", "스터디공간", "무료열람실", "공부카페"],
  openGraph: {
    title: "무료 공부 장소",
    description: "도서관, 청년센터, 주민센터 등 무료로 이용할 수 있는 공부 공간을 찾아보세요.",
    url: "https://free-study-spot.vercel.app",
    siteName: "무료 공부 장소",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "무료 공부 장소",
    description: "도서관, 청년센터, 주민센터 등 무료로 이용할 수 있는 공부 공간을 찾아보세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
