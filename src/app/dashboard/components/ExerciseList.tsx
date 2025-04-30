import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  Search, 
  ChevronRight,
  Heart,
  Footprints,
  Users,
  ArrowUpCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Exercise } from './types';

interface ExerciseListProps {
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
}

// Icons for muscle groups with improved icons
const muscleGroupIcons: Record<string, React.ReactNode> = {
  'Chest': <Users className="h-4 w-4" />,
  'Back': <ArrowUpCircle className="h-4 w-4" />,
  'Legs': <Footprints className="h-4 w-4" />,
  'Shoulders': <Users className="h-4 w-4" />,
  'Arms': <Heart className="h-4 w-4" />,
  'Core': <Clock className="h-4 w-4" />,
  'Cardio': <Heart className="h-4 w-4" />,
  'Full Body': <Users className="h-4 w-4" />,
};

// Enhanced colors for different muscle groups with gradients
const muscleGroupColors: Record<string, { light: string, dark: string, gradient: string }> = {
  'Chest': { 
    light: '#e0f2fe', 
    dark: '#0ea5e9',
    gradient: 'from-blue-400 to-blue-500'
  },
  'Back': { 
    light: '#dcfce7', 
    dark: '#22c55e',
    gradient: 'from-green-400 to-green-500'
  },
  'Legs': { 
    light: '#fef3c7', 
    dark: '#f59e0b',
    gradient: 'from-amber-400 to-amber-500'
  },
  'Shoulders': { 
    light: '#f3e8ff', 
    dark: '#a855f7',
    gradient: 'from-purple-400 to-purple-500'
  },
  'Arms': { 
    light: '#fee2e2', 
    dark: '#ef4444',
    gradient: 'from-red-400 to-red-500'
  },
  'Core': { 
    light: '#dbeafe', 
    dark: '#3b82f6',
    gradient: 'from-indigo-400 to-indigo-500'
  },
  'Cardio': { 
    light: '#fce7f3', 
    dark: '#ec4899',
    gradient: 'from-pink-400 to-pink-500'
  },
  'Full Body': { 
    light: '#f1f5f9', 
    dark: '#64748b',
    gradient: 'from-gray-400 to-gray-500'
  },
};

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, onSelectExercise }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(new Set(exercises.map(ex => ex.category)));
  
  // Filter exercises based on search and category
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? exercise.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });
  
  // Group exercises by category
  const exercisesByCategory: Record<string, Exercise[]> = {};
  filteredExercises.forEach(exercise => {
    if (!exercisesByCategory[exercise.category]) {
      exercisesByCategory[exercise.category] = [];
    }
    exercisesByCategory[exercise.category].push(exercise);
  });
  
  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden border-0">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Dumbbell className="h-5 w-5 text-blue-500" />
          Exercise Library
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Search and filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors shadow-sm
                ${!selectedCategory 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              All
            </button>
            {categories.map(category => {
              const colorSet = muscleGroupColors[category] || { gradient: 'from-gray-400 to-gray-500' };
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors shadow-sm
                    ${category === selectedCategory 
                      ? `bg-gradient-to-r ${colorSet.gradient} text-white` 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Exercise cards */}
        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
          {Object.entries(exercisesByCategory).map(([category, exercises]) => (
            <div key={category}>
              <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                {muscleGroupIcons[category] || <Dumbbell className="h-4 w-4 mr-1.5" />}
                <span className="ml-1.5">{category}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {exercises.map((exercise) => {
                  const colorSet = muscleGroupColors[exercise.category] || { 
                    light: '#f1f5f9', 
                    dark: '#64748b',
                    gradient: 'from-gray-400 to-gray-500'
                  };
                  
                  return (
                    <motion.div
                      key={exercise.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                      className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden group"
                      onClick={() => onSelectExercise(exercise)}
                    >
                      <div className="h-1.5 w-full bg-gradient-to-r transition-all duration-300"
                        style={{ 
                          backgroundImage: `linear-gradient(to right, ${colorSet.dark}80, ${colorSet.dark}80)`
                        }} 
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-800">{exercise.name}</h4>
                            <div className="mt-1.5 flex items-center">
                              <span 
                                className="inline-flex items-center text-xs px-2 py-1 rounded-full" 
                                style={{ 
                                  backgroundColor: colorSet.light,
                                  color: colorSet.dark 
                                }}
                              >
                                {exercise.category}
                              </span>
                            </div>
                            {exercise.description && (
                              <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                                {exercise.description}
                              </p>
                            )}
                          </div>
                          <div className="group-hover:bg-gradient-to-r p-1.5 rounded-full transition-all duration-300"
                            style={{ 
                              backgroundImage: `linear-gradient(to right, ${colorSet.dark}20, ${colorSet.dark}20)`,
                            }}>
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {Object.keys(exercisesByCategory).length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <div className="inline-flex p-4 rounded-full bg-blue-100 mb-3">
                <Search className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-gray-500 font-medium">No exercises found matching your criteria.</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseList; 