import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Oswald } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
//import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { FitLogProvider } from "@/context/FitLogContext";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-fitlog-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-fitlog-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library and Planning Website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${oswald.variable} scroll-smooth bg-black`}>
      <body className="min-h-screen bg-[#050505] text-white antialiased">
        <FitLogProvider>
          <div className="mx-auto max-w-[1360px] px-3 pb-6 pt-2 sm:px-4 lg:px-5">
            <div className="overflow-hidden rounded-[18px] bg-[#070707]">
              <Navbar />
              <div className="min-h-screen">{children}</div>
             {/*  <Footer />*/}
            </div>
          </div>
          <ToastContainer position="top-right" theme="dark" pauseOnHover closeOnClick />
        </FitLogProvider>
      </body>
    </html>
  );
}

