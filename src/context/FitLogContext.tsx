"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import type { Workout } from "@/types/fitlog";

const PLAN_STORAGE_KEY = "fitlog-plan";
const SAVED_STORAGE_KEY = "fitlog-saved";

const isValidWorkoutArray = (value: unknown): value is Workout[] =>
  Array.isArray(value) && value.every((item) => typeof item === "object" && item !== null && "id" in item);

const readStoredWorkouts = (key: string): Workout[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return isValidWorkoutArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

type FitLogContextValue = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  saveWorkout: (workout: Workout) => boolean;
  removeSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  isHydrated: boolean;
};

const FitLogContext = createContext<FitLogContextValue | undefined>(undefined);

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const planRef = useRef<Workout[]>([]);
  const savedRef = useRef<Workout[]>([]);

  useEffect(() => {
    const storedPlan = readStoredWorkouts(PLAN_STORAGE_KEY);
    const storedSaved = readStoredWorkouts(SAVED_STORAGE_KEY);
    planRef.current = storedPlan;
    savedRef.current = storedSaved;
    setPlan(storedPlan);
    setSaved(storedSaved);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
  }, [plan, isHydrated]);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved));
  }, [saved, isHydrated]);

  const addToPlan = useCallback((workout: Workout) => {
    if (planRef.current.some((item) => item.id === workout.id)) {
      toast.error("Already in today’s plan.", {
        icon: <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white"><X className="h-3 w-3" /></span>,
      });
      return false;
    }

    if (planRef.current.length >= 5) {
      toast.warning("Plan full (5/5). Choose a different lift.");
      return false;
    }

    const nextPlan = [...planRef.current, workout];
    planRef.current = nextPlan;
    setPlan(nextPlan);
    toast.success("Added to today’s plan.");
    return true;
  }, []);

  const removeFromPlan = useCallback((id: number) => {
    const nextPlan = planRef.current.filter((item) => item.id !== id);
    planRef.current = nextPlan;
    setPlan(nextPlan);
    toast.info("Workout removed from plan.");
  }, []);

  const saveWorkout = useCallback((workout: Workout) => {
    if (savedRef.current.some((item) => item.id === workout.id)) {
      toast.error("Already saved for later.", {
        icon: <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white"><X className="h-3 w-3" /></span>,
      });
      return false;
    }

    const nextSaved = [...savedRef.current, workout];
    savedRef.current = nextSaved;
    setSaved(nextSaved);
    toast.success("Saved for later.");
    return true;
  }, []);

  const removeSaved = useCallback((id: number) => {
    const nextSaved = savedRef.current.filter((item) => item.id !== id);
    savedRef.current = nextSaved;
    setSaved(nextSaved);
    toast.info("Workout removed from saved list.");
  }, []);

  const markAsDone = useCallback((id: number) => {
    const nextPlan = planRef.current.filter((item) => item.id !== id);
    planRef.current = nextPlan;
    setPlan(nextPlan);
    toast.success("Workout marked as done.");
  }, []);

  const value = useMemo<FitLogContextValue>(
    () => ({
      plan,
      saved,
      addToPlan,
      removeFromPlan,
      saveWorkout,
      removeSaved,
      markAsDone,
      isHydrated,
    }),
    [plan, saved, addToPlan, removeFromPlan, saveWorkout, removeSaved, markAsDone, isHydrated],
  );

  return <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>;
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used within a FitLogProvider");
  }

  return context;
}
