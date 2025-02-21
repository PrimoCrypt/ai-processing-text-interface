import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    title: "Ai Text Processor",
    description: "A chatbot that translates, detects language and summarizes long texts",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const langDetectorToken = process.env.NEXT_PUBLIC_LANGUAGE_DETECTOR_API_ORIGIN_KEY;
    const translationToken = process.env.NEXT_PUBLIC_TRANSLATOR_API_ORIGIN_KEY;
    const summarizerToken = process.env.NEXT_PUBLIC_SUMMARIZER_API_ORIGIN_KEY;

    return (
        <html lang="en">
            <head>
                <meta httpEquiv="origin-trial" content={`${langDetectorToken}`} />
                <meta httpEquiv="origin-trial" content={`${translationToken}`} />
                <meta httpEquiv="origin-trial" content={`${summarizerToken}`} />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
        </html>
    );
}
