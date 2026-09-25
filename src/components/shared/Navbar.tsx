"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useWorkout } from "@/context/WorkoutContext";

const Navbar = () => {
    const pathname = usePathname();
    // const { plan, saved } = useWorkout();

    const navLinks = (
        <>
            <Link href="/" className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    pathname === "/"
                        ? "bg-[#1a2312] text-[#ccff00]"
                        : "text-[#9ca3af] hover:bg-white/10"
                }`}
            >
                Workout
            </Link>

            <Link href="/my-plan" className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                    pathname === "/my-plan"
                        ? "bg-[#1a2312] text-[#ccff00]"
                        : "text-[#9ca3af] hover:bg-white/10"
                }`}
            >
                My Plan
            </Link>
        </>
    );

    return (
        <nav className="bg-black sticky top-0 z-10 text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-bold tracking-wider"
                >
                    FITLOG
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-2 md:flex">
                    {navLinks}
                </div>

                {/* Plan & Saved */}
                <div className="flex items-center gap-2">

                    {/* Plan */}
                    <Link
                        href="/my-plan"
                        className=" bg-[#ccff00] px-4 py-2 text-sm font-bold text-[black]"
                    >
                        Plan 0
                    </Link>

                    {/* Saved */}
                    <Link
                        href="/my-plan"
                        className=" border-white px-4 py-2 text-sm font-bold text-white"
                    >
                        Saved 0
                    </Link>

                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="border-t border-white/10 px-4 py-3 md:hidden">
                <div className="flex items-center justify-center gap-2">
                    {navLinks}
                </div>
            </div>
            <div className="flex w-full flex-col ">
                <div className="divider divider-start"></div>
                        </div>
        </nav>
    );
};

export default Navbar;

