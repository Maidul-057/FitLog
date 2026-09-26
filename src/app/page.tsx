import Banner from "@/components/homepage/Banner";
import WorkoutLibrary from "@/components/homepage/WorkoutLibrary";
import { fetchWorkouts } from "@/lib/api";

export default async function HomePage() {
  let workouts: Awaited<ReturnType<typeof fetchWorkouts>> = [];

  try {
    workouts = await fetchWorkouts();
  } catch {
    workouts = [];
  }

  return (
    <main className="bg-black text-white">
      <Banner />
      <WorkoutLibrary initialWorkouts={workouts} />
    </main>
  );
}
