// Common types used across dashboard components

export interface Exercise {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface Workout {
  id: string;
  date: string;
  exercises: WorkoutExercise[];
  completed: boolean;
}

export interface WorkoutExercise {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface ProgressData {
  month: string;
  workouts: number;
}

export interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  colors: string[];
  delay: number;
  icon?: React.ReactNode;
} 