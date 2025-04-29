import { z } from 'zod';

// Schema for adding a new exercise
export const AddExerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
});

// Type derived from the schema
export type AddExerciseFormValues = z.infer<typeof AddExerciseSchema>; 