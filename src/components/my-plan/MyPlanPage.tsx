"use client";

import Image from "next/image";
import Link from "next/link";
import { Flame, Star, TimerReset, X, CheckCircle2, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { useFitLog } from "@/context/FitLogContext";
import type { ActiveTab, SortOption } from "@/types/fitlog";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, markAsDone, removeSaved, isHydrated } = useFitLog();
  const [activeTab, setActiveTab] = useState<ActiveTab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const currentList = activeTab === "plan" ? plan : saved;

  const filteredList = useMemo(() => {
    return [...currentList].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
      return a.duration - b.duration;
    });
  }, [currentList, sortBy]);

  const metrics = useMemo(() => {
    const exercises = plan.length;
    const minutes = plan.reduce((sum, item) => sum + item.duration, 0);
    const calories = plan.reduce((sum, item) => sum + item.caloriesBurned, 0);

    return { exercises, minutes, calories };
  }, [plan]);

  return (
    <main className="min-h-screen bg-[#090909] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">MY PLAN</h1>
            <p className="mt-2 text-sm text-zinc-400">Cap of five lifts for today. Finish them, then load more.</p>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <MetricCard label="Exercises" value={metrics.exercises} />
          <MetricCard label="Minutes" value={metrics.minutes} />
          <MetricCard label="Calories" value={metrics.calories} />
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div role="tablist" aria-label="Workout list" className="flex h-8 w-[208px] shrink-0 gap-0.5 rounded-lg border border-white/10 bg-[#111111] p-0.5">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "plan"}
              onClick={() => setActiveTab("plan")}
              className={`text-nowrap flex-1 rounded-md px-2 text-[12px] font-medium transition ${
                activeTab === "plan" ? "bg-[#1a2312] text-[#ccff00]" : "text-[#858b98] hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "saved"}
              onClick={() => setActiveTab("saved")}
              className={`flex-1 rounded-md px-2 text-[12px] font-medium transition ${
                activeTab === "saved" ? "bg-[#1a2312] text-[#ccff00]" : "text-[#858b98] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
            
            <label className="flex h-8 items-center gap-2 text-[12px] text-[#858b98]">
              <span>Sort By</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="h-8 w-[104px] rounded-md border border-[#222630] bg-[#15171d] px-2 text-[12px] text-[#e5e7eb] outline-none focus:border-[#505664]"
                aria-label="Sort workouts"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </label>
          </div>
        </div>

        {!isHydrated ? (
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-10 text-center text-zinc-400">Loading plan…</div>
        ) : filteredList.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-[#111111] px-6 py-12 text-center">
            <p className="text-2xl font-black uppercase tracking-wide text-white">NOTHING HERE YET</p>
            <p className="mt-3 text-sm text-zinc-400">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="mt-6 inline-flex rounded-full bg-[#ccff00] px-5 py-3 text-sm font-black uppercase tracking-wide text-black">
              GO TO WORKOUTS
            </Link>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredList.map((workout) => (
              <article key={workout.id} className="grid grid-cols-[80px_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-[12px] border border-[#222630] bg-[#15171d] px-3 py-3 sm:grid-cols-[108px_minmax(0,1fr)_auto] sm:gap-4">
                <div className="relative h-[52px] w-20 overflow-hidden rounded-[5px] bg-[#0b0c10] sm:h-[60px] sm:w-[108px]">
                  <Image src={workout.image} alt={workout.name} fill sizes="108px" className="object-cover" />
                </div>

                <div className="min-w-0 font-[family-name:var(--font-fitlog-inter)]">
                  <h2 className="truncate font-[family-name:var(--font-fitlog-oswald)] text-[14px] font-bold uppercase leading-5 text-white">{workout.name}</h2>
                  <p className="truncate text-[12px] leading-4 text-[#9ca3af]">{workout.equipment}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] leading-4 text-[#d1d5db]">
                    <span className="inline-flex items-center gap-1"><TimerReset className="h-3 w-3 text-[#c2f800]" />{workout.duration} min</span>
                    <span className="inline-flex items-center gap-1"><Flame className="h-3 w-3 fill-[#c2f800] text-[#c2f800]" />{workout.caloriesBurned} kcal</span>
                    <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 text-[#c2f800]" />{workout.rating}</span>
                  </div>
                </div>

                <div className="col-span-2 flex items-center justify-end gap-2 sm:col-span-1">
                  <Link href={`/workout/${workout.id}`} className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-[#303542] px-3 text-[12px] font-medium text-[#d1d5db] transition hover:border-[#c2f800] hover:text-white">
                    <Eye className="h-3.5 w-3.5" /> View Details
                  </Link>

                  {activeTab === "plan" ? (
                    <button type="button" onClick={() => markAsDone(workout.id)} className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full bg-[#c2f800] px-4 text-[12px] font-semibold text-black transition hover:brightness-95">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Mark as Done
                    </button>
                  ) : null}

                  <button type="button" onClick={() => (activeTab === "plan" ? removeFromPlan(workout.id) : removeSaved(workout.id))} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#303542] text-[#9ca3af] transition hover:border-red-400/50 hover:text-red-300" aria-label={`Remove ${workout.name}`}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111111] p-5">
      <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-zinc-500">{label}</p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
    </div>
  );
}
