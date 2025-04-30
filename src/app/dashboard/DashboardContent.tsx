'use client';

import React, { useState } from "react";
import { Activity, ArrowUpRight, Dumbbell, Calendar, History, LineChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/context/auth-provider';
import { motion } from "framer-motion";

// Import components
import StatsCard from './components/StatsCard';
import ExerciseList from './components/ExerciseList';
import AddExerciseForm from './components/AddExerciseForm';
import AddWorkoutForm from './components/AddWorkoutForm';
import WorkoutHistory from './components/WorkoutHistory';
import ProgressChart from './components/ProgressChart';
import { Exercise, Workout, ProgressData } from './components/types';

// Main Dashboard Component
const DashboardContent: React.FC = () => {
  const { user } = useAuth();

  // Sample data
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: "ex1", name: "Bench Press", category: "Chest", description: "Compound chest exercise" },
    { id: "ex2", name: "Squat", category: "Legs", description: "Compound leg exercise" },
    { id: "ex3", name: "Deadlift", category: "Back", description: "Compound back exercise" },
    { id: "ex4", name: "Pull-up", category: "Back", description: "Upper body pulling exercise" },
    { id: "ex5", name: "Push-up", category: "Chest", description: "Bodyweight chest exercise" },
  ]);

  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: "w1",
      date: "2023-05-15",
      exercises: [
        { exerciseId: "ex1", exerciseName: "Bench Press", sets: 3, reps: 10, weight: 80 },
        { exerciseId: "ex4", exerciseName: "Pull-up", sets: 3, reps: 8, weight: 0 },
      ],
      completed: true,
    },
    {
      id: "w2",
      date: "2023-05-18",
      exercises: [
        { exerciseId: "ex2", exerciseName: "Squat", sets: 4, reps: 8, weight: 100 },
        { exerciseId: "ex3", exerciseName: "Deadlift", sets: 3, reps: 6, weight: 120 },
      ],
      completed: false,
    },
  ]);

  const progressData: ProgressData[] = [
    { month: "Jan", workouts: 8 },
    { month: "Feb", workouts: 12 },
    { month: "Mar", workouts: 10 },
    { month: "Apr", workouts: 15 },
    { month: "May", workouts: 18 },
    { month: "Jun", workouts: 14 },
  ];

  const handleAddExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise]);
  };

  const handleAddWorkout = (workout: Omit<Workout, "id">) => {
    const newWorkout: Workout = {
      ...workout,
      id: `w${workouts.length + 1}`,
    };
    setWorkouts([newWorkout, ...workouts]);
  };

  const handleToggleComplete = (id: string) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === id
          ? { ...workout, completed: !workout.completed }
          : workout
      )
    );
  };

  const handleSelectExercise = (exercise: Exercise) => {
    // This function would be used to add an exercise to a workout
    console.log(`Selected exercise: ${exercise.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Animated greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 text-transparent bg-clip-text">
            Welcome back, <span className="text-blue-600">{user?.email ?? 'User'}</span>
          </h1>
          <p className="text-gray-500 mt-1">Track your progress and crush your fitness goals</p>
        </motion.div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatsCard
            title="Total Workouts"
            value={workouts.length}
            subtitle="All time"
            colors={["#4f46e5", "#3b82f6"]}
            delay={0}
            icon={<Activity className="h-5 w-5" />}
          />
          <StatsCard
            title="Exercises"
            value={exercises.length}
            subtitle="In your library"
            colors={["#10b981", "#34d399"]}
            delay={0.1}
            icon={<Dumbbell className="h-5 w-5" />}
          />
          <StatsCard
            title="Completed"
            value={workouts.filter(w => w.completed).length}
            subtitle="Finished workouts"
            colors={["#f97316", "#fb923c"]}
            delay={0.2}
            icon={<Calendar className="h-5 w-5" />}
          />
          <StatsCard
            title="Progress"
            value="+15%"
            subtitle="Last 30 days"
            colors={["#8b5cf6", "#c084fc"]}
            delay={0.3}
            icon={<ArrowUpRight className="h-5 w-5" />}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="workouts" className="mt-8">
          <TabsList className="mb-6 bg-white p-1 rounded-full border border-gray-200 shadow-sm">
            <TabsTrigger 
              value="workouts" 
              className="rounded-full px-6 py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Workouts
            </TabsTrigger>
            <TabsTrigger 
              value="exercises" 
              className="rounded-full px-6 py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Exercises
            </TabsTrigger>
            <TabsTrigger 
              value="progress" 
              className="rounded-full px-6 py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Progress
            </TabsTrigger>
          </TabsList>
          
          {/* Workouts Tab */}
          <TabsContent value="workouts" className="space-y-8">
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
              <AddWorkoutForm 
                exercises={exercises} 
                onAddWorkout={handleAddWorkout}
                onSelectExercise={handleSelectExercise} 
              />
              <WorkoutHistory 
                workouts={workouts} 
                onToggleComplete={handleToggleComplete} 
              />
        </div>
          </TabsContent>
          
          {/* Exercises Tab */}
          <TabsContent value="exercises" className="space-y-8">
            <AddExerciseForm onAddExercise={handleAddExercise} />
            <ExerciseList 
              exercises={exercises} 
              onSelectExercise={handleSelectExercise} 
            />
          </TabsContent>
          
          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-8">
            <ProgressChart data={progressData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardContent; 