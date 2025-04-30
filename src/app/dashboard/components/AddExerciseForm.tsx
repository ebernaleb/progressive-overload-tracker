import React from 'react';
import { Dumbbell, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddExerciseSchema, AddExerciseFormValues } from '@/schemas/add-exercise';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Exercise } from './types';

interface AddExerciseFormProps {
  onAddExercise: (exercise: Exercise) => void;
}

const AddExerciseForm: React.FC<AddExerciseFormProps> = ({ onAddExercise }) => {
  const form = useForm<AddExerciseFormValues>({
    resolver: zodResolver(AddExerciseSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
    },
    mode: 'onBlur',
  });
  const { control, handleSubmit, reset, formState: { errors } } = form;

  const onSubmit = (data: AddExerciseFormValues) => {
    onAddExercise({
      id: `ex${Date.now()}`,
      name: data.name,
      category: data.category,
      description: data.description || '',
    });
    reset();
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5" />
          Add Exercise
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Bench Press" />
                    </FormControl>
                    {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Chest" />
                    </FormControl>
                    {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Optional description" />
                    </FormControl>
                    {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Exercise
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddExerciseForm; 