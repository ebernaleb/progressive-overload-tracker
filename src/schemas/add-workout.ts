import { z } from 'zod';

// Schema for exercise in a workout
export const WorkoutExerciseSchema = z.object({
  exerciseId: z.string(),
  exerciseName: z.string(),
  sets: z.number().int().positive(),
  reps: z.number().int().positive(),
  weight: z.number().nonnegative(),
});

// Schema for adding a new workout
export const AddWorkoutSchema = z.object({
  date: z.string(),
  exercises: z.array(WorkoutExerciseSchema),
  completed: z.boolean().optional().default(false),
});

// Types derived from the schema
export type WorkoutExercise = z.infer<typeof WorkoutExerciseSchema>;
export type AddWorkoutFormValues = z.infer<typeof AddWorkoutSchema>; 