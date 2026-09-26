import type { Workout } from "@/types/fitlog";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function fetchWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data = await response.json();
  return Array.isArray(data) ? (data as Workout[]) : [];
}

export async function fetchWorkoutById(id: number): Promise<Workout> {
  const response = await fetch(`${API_URL}/${id}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Workout ${id} not found`);
  }

  const data = await response.json();
  return data as Workout;
}
