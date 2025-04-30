import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronUp, Calendar, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useExpandable } from "./hooks";
import { Workout } from "./types";

interface WorkoutHistoryItemProps {
  workout: Workout;
  onToggleComplete: (id: string) => void;
}

const WorkoutHistoryItem: React.FC<WorkoutHistoryItemProps> = ({ workout, onToggleComplete }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isExpanded, toggleExpand, animatedHeight } = useExpandable(false);

  useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(isExpanded ? contentRef.current.offsetHeight : 0);
    }
  }, [isExpanded, animatedHeight]);

  const formattedDate = new Date(workout.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Calculate total volume for the workout
  const totalVolume = workout.exercises.reduce((sum, ex) => {
    return sum + (ex.sets * ex.reps * ex.weight);
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
      whileHover={{ y: -2 }}
    >
      <div 
        className={cn(
          "p-4 flex justify-between items-center cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-colors",
          workout.completed 
            ? "border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white" 
            : "border-l-4 border-l-gray-200"
        )}
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-10 w-10 p-0 rounded-full shadow-sm", 
              workout.completed 
                ? "bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600" 
                : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500 hover:from-gray-200 hover:to-gray-300"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(workout.id);
            }}
          >
            <CheckCircle2 className="h-5 w-5" />
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="font-semibold text-gray-800">{formattedDate}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1.5 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Dumbbell className="h-3 w-3 text-gray-400" />
                <span>{workout.exercises.length} exercise{workout.exercises.length !== 1 ? 's' : ''}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>Total volume: {totalVolume.toLocaleString()} kg</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {workout.completed && (
            <span className="bg-gradient-to-r from-green-400 to-green-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
              Completed
            </span>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm flex items-center justify-center"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-600" />
            )}
          </Button>
        </div>
      </div>

      <motion.div
        style={{ height: animatedHeight }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="p-4 bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
          <div className="space-y-3">
            {workout.exercises.map((exercise, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group"
              >
                <div className="flex justify-between">
                  <div className="font-semibold text-gray-800">{exercise.exerciseName}</div>
                  <div className="text-sm font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">
                    {exercise.sets * exercise.reps * exercise.weight} kg
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    {exercise.sets} {exercise.sets === 1 ? 'set' : 'sets'}
                  </div>
                  <div className="bg-gradient-to-r from-purple-400 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    {exercise.reps} {exercise.reps === 1 ? 'rep' : 'reps'}
                  </div>
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    {exercise.weight} kg
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WorkoutHistoryItem; 