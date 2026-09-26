import { notFound } from "next/navigation";
import WorkoutDetail from "@/components/workout/WorkoutDetail";
import { fetchWorkoutById } from "@/lib/api";

export default async function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const workout = await fetchWorkoutById(Number(id));
    return <WorkoutDetail workout={workout} />;
  } catch {
    notFound();
  }
}
