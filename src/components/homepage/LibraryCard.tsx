import React from "react";
import { Clock, Flame } from "lucide-react";
import {cardTypes} from  '@/types/cardTypes'
import Image from 'next/image';

const getCard = async (): Promise<cardTypes[]> => {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
       if (!response.ok) {
        throw new Error("Failed to fetch workout data"); }
        const data = await response.json();
                  return data;     };

          const LibraryCard = async () => {
             const cardData = await getCard();

    return (
      <section className="bg-black py-16 text-white" id="library">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-4xl font-bold">THE LIBRARY</h2>

            <p className="mt-2 text-gray-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cardData.map((post) => (
              <div
                key={post.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition hover:-translate-y-1 hover:border-[#ccff00]"
              >
                {/* Image */}
                <Image
                  src={post.image}
                  alt={post.name}
                  width={740}
                  height={420}
                  className="h-52 w-full object-cover"
                />

                {/* Content */}
                <div className="p-5">
                  {/* Muscle Groups */}
                  <div className="mb-3 flex flex-wrap gap-2">
                    {post.muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-semibold text-black"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                  {/* Name */}
                  <h3 className="text-xl font-bold">{post.name}</h3>
                  {/* Equipment */}
                  <p className="mt-2 text-sm text-gray-400">{post.equipment}</p>
                  {/* Stats */}

                  <div className="mt-5 grid grid-cols-3 rounded-lg border border-white/10 text-sm items-center">
                    <div className="p-3 text-center flex items-center justify-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#9ca3af]" />
                      <p className="font-semibold text-[#9ca3af] text-xs">
                        {post.duration} min
                      </p>
                    </div>

                    <div className="p-3 text-center flex items-center justify-center gap-1.5">
                      <Flame className="w-4 h-4 text-[#9ca3af]" />
                      <p className="whitespace-nowrap font-semibold text-[#9ca3af] text-xs">
                        {post.caloriesBurned} kcal
                      </p>
                    </div>

                    <div className="p-3 text-center">
                      <p className="font-semibold text-[#9ca3af] text-xs">
                        ★ {post.rating}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default LibraryCard;