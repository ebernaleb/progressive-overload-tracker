import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Filter, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import WorkoutHistoryItem from "./WorkoutHistoryItem";
import { Workout } from "./types";

interface WorkoutHistoryProps {
  workouts: Workout[];
  onToggleComplete: (id: string) => void;
}

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ workouts, onToggleComplete }) => {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const filteredWorkouts = workouts.filter((workout) => {
    if (filter === "all") return true;
    if (filter === "completed") return workout.completed;
    if (filter === "pending") return !workout.completed;
    return true;
  });

  const today = format(new Date(), "MMMM yyyy");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-blue-50 border border-gray-100 rounded-xl p-6 shadow-sm"
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          Workout History
          <span className="text-sm font-normal text-gray-500 ml-2">{today}</span>
        </h2>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-2 text-gray-600 border-gray-200 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              {filter === "all" ? "All" : filter === "completed" ? "Completed" : "Pending"}
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem onClick={() => setFilter("all")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("completed")}>Completed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("pending")}>Pending</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredWorkouts.length > 0 ? (
        <div className="space-y-3 overflow-y-auto max-h-[600px] pr-1">
          {filteredWorkouts.map((workout) => (
            <WorkoutHistoryItem
              key={workout.id}
              workout={workout}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="bg-blue-100 text-blue-500 p-3 rounded-full mb-3">
            <Calendar className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">No workouts found</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            {filter === "all" 
              ? "You haven't created any workouts yet. Get started by adding your first workout!"
              : filter === "completed" 
                ? "You haven't completed any workouts yet. Mark a workout as complete when you're done."
                : "You don't have any pending workouts. All your workouts are completed!"}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default WorkoutHistory; 