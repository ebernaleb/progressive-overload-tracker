import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, X, Save } from 'lucide-react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddWorkoutSchema, AddWorkoutFormValues } from '@/schemas/add-workout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Exercise, Workout } from './types';

interface AddWorkoutFormProps {
  exercises: Exercise[];
  onAddWorkout: (workout: Omit<Workout, "id">) => void;
  onSelectExercise?: (exercise: Exercise) => void;
}

const AddWorkoutForm: React.FC<AddWorkoutFormProps> = ({ 
  exercises, 
  onAddWorkout,
  onSelectExercise 
}) => {
  const defaultValues: AddWorkoutFormValues = {
    date: new Date().toISOString().split('T')[0],
    exercises: [],
    completed: false,
  };

  const form = useForm<AddWorkoutFormValues>({
    resolver: zodResolver(AddWorkoutSchema),
    defaultValues,
    mode: 'onBlur',
  });
  
  const { control, handleSubmit, setValue, watch, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  const handleAddExercise = (exercise: Exercise) => {
    append({
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: 3,
      reps: 10,
      weight: 0,
    });
    
    // Call the parent handler if provided
    if (onSelectExercise) {
      onSelectExercise(exercise);
    }
  };

  const onSubmit: SubmitHandler<AddWorkoutFormValues> = (data) => {
    onAddWorkout({
      ...data,
      completed: data.completed === undefined ? false : data.completed,
    });
    form.reset(defaultValues);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Create New Workout
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} required />
                    </FormControl>
                    {errors.date && <span className="text-red-500 text-xs">{errors.date.message}</span>}
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Selected Exercises</FormLabel>
                {fields.length === 0 ? (
                  <div className="text-sm text-muted-foreground p-3 border border-dashed border-border rounded-lg">
                    No exercises selected. Choose from the exercise library.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                    {fields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 border border-border rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{field.exerciseName}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <FormField
                            control={control}
                            name={`exercises.${index}.sets`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Sets</FormLabel>
                                <FormControl>
                                  <Input type="number" min="1" {...field} className="h-8" />
                                </FormControl>
                                {errors.exercises?.[index]?.sets && (
                                  <span className="text-red-500 text-xs">{errors.exercises[index]?.sets?.message}</span>
                                )}
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`exercises.${index}.reps`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Reps</FormLabel>
                                <FormControl>
                                  <Input type="number" min="1" {...field} className="h-8" />
                                </FormControl>
                                {errors.exercises?.[index]?.reps && (
                                  <span className="text-red-500 text-xs">{errors.exercises[index]?.reps?.message}</span>
                                )}
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`exercises.${index}.weight`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Weight (kg)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" step="0.5" {...field} className="h-8" />
                                </FormControl>
                                {errors.exercises?.[index]?.weight && (
                                  <span className="text-red-500 text-xs">{errors.exercises[index]?.weight?.message}</span>
                                )}
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" disabled={fields.length === 0} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Workout
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddWorkoutForm; 