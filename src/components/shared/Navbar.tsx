"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useFitLog } from "@/context/FitLogContext";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, isHydrated } = useFitLog();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = (
    <>
      <Link
        href="/"
        onClick={() => setIsOpen(false)}
        className={`rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.2em] transition ${
          pathname === "/" ? "bg-[#1a2312] text-[#ccff00]" : "text-zinc-300 hover:bg-white/5 hover:text-white"
        }`}
      >
        Workout
      </Link>
      <Link
        href="/my-plan"
        onClick={() => setIsOpen(false)}
        className={`rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.2em] transition ${
          pathname === "/my-plan" ? "bg-[#1a2312] text-[#ccff00]" : "text-zinc-300 hover:bg-white/5 hover:text-white"
        }`}
      >
        My Plan
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#070707]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-black tracking-[0.25em] text-white text-[18px]">
         <Image src={logo} alt="FitLog logo" width={24} height={24} className="h-6 w-6" />
          FITLOG
        </Link>

        <div className="hidden items-center gap-2 md:flex">{navLinks}</div>

        <div className="flex items-center gap-4">
          <Link href="/my-plan" className="flex items-center gap-1.5 text-[12px] font-semibold text-zinc-300 transition hover:text-white">
            <span>Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1 text-[12px] font-black leading-none text-black">
              {isHydrated ? plan.length : 0}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-1.5 text-[12px] font-semibold text-zinc-300 transition hover:text-white">
            <span>Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/20 px-1 text-[12px] font-semibold leading-none text-zinc-300">
              {isHydrated ? saved.length : 0}
            </span>
          </Link>

          <button type="button" aria-label="Toggle menu" className="inline-flex rounded-full border border-white/10 p-2 md:hidden" onClick={() => setIsOpen((value) => !value)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-white/10 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">{navLinks}</div>
        </div>
      ) : null}
    </nav>
  );
}

