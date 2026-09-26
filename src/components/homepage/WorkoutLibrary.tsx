"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import { useMemo, useState } from "react";
import type { SortOption, Workout } from "@/types/fitlog";

export default function WorkoutLibrary({ initialWorkouts }: { initialWorkouts: Workout[] }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption | null>(null);

  const filteredWorkouts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = initialWorkouts.filter((workout) => {
      if (!normalizedQuery) {
        return true;
      }

      const searchableText = [
        workout.name,
        workout.equipment,
        ...(workout.muscleGroups ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });

    const sortedCopy = [...filtered];
    if (sortBy) {
      sortedCopy.sort((a, b) => {
        if (sortBy === "rating") {
          return b.rating - a.rating;
        }

        if (sortBy === "calories") {
          return a.caloriesBurned - b.caloriesBurned;
        }

        return a.duration - b.duration;
      });
    }

    return sortedCopy;
  }, [initialWorkouts, query, sortBy]);

  return (
    <section id="library" className="bg-[#090909] px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-6 md:mb-7">
          <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">THE LIBRARY</h2>
          <p className="mt-2 text-sm text-zinc-400">Twelve lifts covering every major muscle group.</p>
        </div>

        {filteredWorkouts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-[#101010] px-6 py-12 text-center">
            <p className="text-2xl font-black uppercase tracking-wide text-white">No results</p>
            <p className="mt-2 text-sm text-zinc-400">Try a different lift, muscle group, or equipment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredWorkouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workout/${workout.id}`}
                className="group overflow-hidden rounded-2xl border border-[#222630] bg-[#15171d] text-left transition duration-200 hover:-translate-y-1 hover:border-[#ccff00]/80 hover:shadow-[0_0_0_1px_rgba(204,255,0,0.25)]"
              >
                <Image
                  src={workout.image}
                  alt={workout.name}
                  width={740}
                  height={420}
                  sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className="block aspect-[2.045/1] w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <div className="flex min-h-[173px] flex-col justify-between p-6 font-[family-name:var(--font-fitlog-inter)]">
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                      <span
                        key={`${workout.id}-${muscle}`}
                        className="rounded-full bg-[#c2f800] px-2.5 py-0.5 text-[12px] font-bold uppercase tracking-[0.05em] text-black"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-[family-name:var(--font-fitlog-oswald)] text-[18px] font-bold uppercase leading-7 tracking-[0.45px] text-white">{workout.name}</h3>
                    <p className="text-[12px] leading-4 text-[#9ca3af]">{workout.equipment}</p>
                  </div>

                  <div className="flex h-7 items-center gap-4 border border-[#20242e] pl-2.5 text-[12px] leading-4 text-[#9ca3af]">
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <Clock3 className="h-3.5 w-3.5 shrink-0" />
                      <span>{workout.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <Flame className="h-3.5 w-3.5 shrink-0 fill-[#9ca3af]" />
                      <span>{workout.caloriesBurned} kcal</span>
                    </div>
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <Star className="h-3.5 w-3.5 shrink-0" />
                      <span>{workout.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
