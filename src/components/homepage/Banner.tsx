import Image from "next/image";
import bannerimg from "@/assets/banner.png";

export default function Banner() {
  return (
    <section className="bg-[#090909] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto grid max-w-[1280px] gap-6 overflow-hidden rounded-[22px] border border-white/10 bg-[#111111] p-4 sm:p-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-8">
        <div className="max-w-xl">
          <p className="text-[12px] font-bold uppercase tracking-[0.38em] text-[#ccff00]">WORKOUT LIBRARY</p>
          <h1 className="mt-4 text-4xl font-black leading-[0.94] tracking-[-0.05em] text-white sm:text-5xl lg:text-[4rem]">
            TRAIN WITH INTENT.<br />LOG EVERY SET.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-300 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-7 inline-flex rounded-full bg-[#ccff00] px-5 py-3 text-[12px] font-black uppercase tracking-[0.22em] text-black transition hover:brightness-95"
          >
            BROWSE WORKOUTS
          </a>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[460px] overflow-hidden rounded-[26px] border border-white/10 bg-[#171717] p-2">
            <Image src={bannerimg} alt="FitLog workout banner" className="h-auto w-full rounded-[20px] object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
