import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090909] text-white">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-black tracking-[0.25em] text-white">
          <Image src={logo} alt="FitLog logo" width={24} height={24} className="h-6 w-6" />
          <span>FITLOG</span>
        </Link>

        <p className="text-[12px] text-[#6b7280]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
