"use client";

import Image from "next/image";
import { Bookmark, Square } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";
import type { Workout } from "@/types/fitlog";

export default function WorkoutDetail({ workout }: { workout: Workout }) {
  const { plan, addToPlan, saveWorkout } = useFitLog();
  const inPlan = plan.some((item) => item.id === workout.id);
  const isPlanFull = plan.length >= 5;
  const metadata = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", `${workout.sets}`],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", `${workout.rating}`],
  ];

  return (
    <main className="bg-[#0b0c10] px-4 py-8 text-white sm:px-6 lg:px-5 lg:py-[34px]">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-[#222630] bg-[#15171d] lg:aspect-[4/5]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col lg:min-h-full">
            <div>
              <h1 className="font-[family-name:var(--font-fitlog-oswald)] text-[28px] font-bold uppercase leading-tight text-white sm:text-[30px]">
                {workout.name}
              </h1>
              <p className="mt-1.5 text-[12px] leading-[18px] text-[#9ca3af]">
                {workout.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={`${workout.id}-${muscle}`}
                    className="rounded-full bg-[#c2f800] px-2.5 py-1 font-[family-name:var(--font-fitlog-inter)] text-[12px] font-bold uppercase leading-4 text-black"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            <dl className="mt-4 overflow-hidden rounded-[10px] border border-[#222630] bg-[#15171d] font-[family-name:var(--font-fitlog-inter)]">
              {metadata.map(([label, value], index) => (
                <div
                  key={label}
                  className={`flex min-h-[33px] items-center justify-between gap-4 px-4 py-1.5 ${index < metadata.length - 1 ? "border-b border-[#222630]" : ""}`}
                >
                  <dt className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#858b98]">{label}</dt>
                  <dd className="text-right text-[12px] font-medium text-[#d1d5db]">{value}</dd>
                </div>
              ))}
            </dl>

            <section className="mt-5 font-[family-name:var(--font-fitlog-inter)]">
              <h2 className="font-[family-name:var(--font-fitlog-oswald)] text-[15px] font-bold uppercase leading-5 text-white">
                Instructions
              </h2>
              <ol className="mt-2.5 list-decimal space-y-1.5 pl-4 text-[12px] leading-[18px] text-[#a3a7b0] marker:text-[#858b98]">
                {workout.instructions.map((instruction, index) => (
                  <li key={`${workout.id}-instruction-${index}`} className="pl-0.5">
                    {instruction}
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => addToPlan(workout)}
                disabled={isPlanFull && !inPlan}
                className="inline-flex min-h-[36px] flex-1 items-center justify-center gap-2 rounded-[8px] bg-[#c2f800] px-4 py-2 font-[family-name:var(--font-fitlog-inter)] text-[12px] font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
              >
                <Square className="h-3.5 w-3.5" />
                {isPlanFull && !inPlan ? "Plan full (5/5)" : "Add to today's plan"}
              </button>

              <button
                type="button"
                onClick={() => saveWorkout(workout)}
                className="inline-flex min-h-[36px] flex-1 items-center justify-center gap-2 rounded-[8px] border border-[#303542] bg-transparent px-4 py-2 font-[family-name:var(--font-fitlog-inter)] text-[12px] font-semibold text-[#d1d5db] transition hover:border-[#c2f800] hover:text-white disabled:cursor-not-allowed disabled:border-zinc-700 disabled:text-zinc-500"
              >
                <Bookmark className="h-3.5 w-3.5" />
                Save for later
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
