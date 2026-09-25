
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Banner from "@/components/homepage/Banner";
import LibraryCard from "@/components/homepage/LibraryCard";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "FitLog",
    description: "Workout Library and Planning Website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            data-theme="dark"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-black`}
        >
            <body className="min-h-full flex flex-col bg-black text-white">

                <Navbar />
                <Banner />
                <LibraryCard/>
                {children}

            </body>
        </html>
    );
}

