import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, BarChart, Trophy, ChevronDown, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressData } from './types';

// Fake data for demonstration
const liftProgressData = [
  { date: 'Jan', weight: 135 },
  { date: 'Feb', weight: 145 },
  { date: 'Mar', weight: 155 },
  { date: 'Apr', weight: 155 },
  { date: 'May', weight: 165 },
  { date: 'Jun', weight: 175 },
];

const weeklyVolumeData = [
  { week: 'Week 1', volume: 12000 },
  { week: 'Week 2', volume: 14500 },
  { week: 'Week 3', volume: 13200 },
  { week: 'Week 4', volume: 16800 },
];

const personalRecords = [
  { exercise: 'Bench Press', weight: 185, date: '2023-06-10', isPR: true },
  { exercise: 'Squat', weight: 255, date: '2023-06-15', isPR: true },
  { exercise: 'Deadlift', weight: 315, date: '2023-05-25', isPR: true },
];

const exercises = [
  { value: 'bench', label: 'Bench Press' },
  { value: 'squat', label: 'Squat' },
  { value: 'deadlift', label: 'Deadlift' },
];

interface ProgressChartProps {
  data: ProgressData[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const [selectedExercise, setSelectedExercise] = useState(exercises[0].value);
  
  // Line Chart for Selected Lift Progress
  const renderLineChart = () => {
    const maxValue = Math.max(...liftProgressData.map(item => item.weight));
    const chartHeight = 200;
    
    return (
      <div className="relative">
        <div className="absolute left-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>{maxValue} kg</span>
          <span>{Math.floor(maxValue / 2)} kg</span>
          <span>0 kg</span>
        </div>
        
        <div className="pl-10 h-[240px]">
          <div className="relative h-[200px] flex items-end justify-between">
            {liftProgressData.map((item, index) => {
              const height = (item.weight / maxValue) * chartHeight;
              const isLastPoint = index === liftProgressData.length - 1;
              
              return (
                <div key={index} className="flex flex-col items-center relative z-10 group">
                  {index > 0 && (
                    <div 
                      className="absolute h-1.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full z-0"
                      style={{
                        width: `100%`,
                        bottom: `${(liftProgressData[index-1].weight / maxValue) * chartHeight}px`,
                        left: '-50%',
                        transform: `rotate(${Math.atan2(
                          (item.weight - liftProgressData[index-1].weight) / maxValue * chartHeight,
                          40
                        )}rad)`,
                        transformOrigin: 'left bottom'
                      }}
                    />
                  )}
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`w-5 h-5 rounded-full mb-1 flex items-center justify-center
                      ${isLastPoint ? 'bg-gradient-to-r from-green-400 to-green-500 shadow-lg shadow-green-200' : 
                      'bg-gradient-to-r from-blue-400 to-blue-500 shadow-md shadow-blue-200'}`}
                    style={{ marginBottom: `${height}px` }}
                  >
                    {isLastPoint && (
                      <TrendingUp className="h-3 w-3 text-white" />
                    )}
                  </motion.div>
                  
                  <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-opacity duration-200 min-w-20 text-center">
                    {item.weight} kg
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="absolute bottom-0 h-full flex flex-col justify-end"
                  >
                    <div 
                      className="w-1 bg-gray-200" 
                      style={{ height: `${height}px` }}
                    />
                  </motion.div>
                  
                  <div className="mt-2 text-xs font-medium text-gray-600">{item.date}</div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="relative inline-block">
              <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className="appearance-none w-40 p-2 pr-8 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              >
                {exercises.map(ex => (
                  <option key={ex.value} value={ex.value}>{ex.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            <div className="text-sm font-medium text-gray-700">
              Progress over time
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Bar Chart for Weekly Volume
  const renderBarChart = () => {
    const maxVolume = Math.max(...weeklyVolumeData.map(item => item.volume));
    const chartHeight = 200;
    
    return (
      <div className="h-[280px] pt-4">
        <div className="absolute left-0 h-[200px] flex flex-col justify-between text-xs text-gray-500">
          <span>{Math.round(maxVolume/1000)}k</span>
          <span>{Math.round(maxVolume/2000)}k</span>
          <span>0</span>
        </div>
        
        <div className="pl-10 h-[240px]">
          <div className="h-[200px] flex items-end justify-around">
            {weeklyVolumeData.map((item, index) => {
              const height = (item.volume / maxVolume) * chartHeight;
              return (
                <div key={index} className="flex flex-col items-center w-16 group">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-10 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg relative shadow-md shadow-purple-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-opacity duration-200 z-10 min-w-24 text-center">
                      {item.volume.toLocaleString()} kg
                    </div>
                  </motion.div>
                  <div className="mt-2 text-xs font-medium text-gray-600">{item.week}</div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 text-center">
            <span className="text-sm font-medium text-gray-700">Weekly Training Volume (kg)</span>
          </div>
        </div>
      </div>
    );
  };
  
  // PR Chart with Trophies
  const renderPRChart = () => {
    return (
      <div className="h-[280px] pt-4">
        <div className="space-y-4">
          {personalRecords.map((record, index) => (
            <motion.div 
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg p-4 shadow-md border border-gray-100 flex items-center hover:shadow-lg transition-shadow"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="mr-4 p-3 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full shadow-md shadow-yellow-200">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{record.exercise}</h4>
                <div className="flex items-center mt-1">
                  <span className="text-lg font-bold text-gray-900">{record.weight} kg</span>
                  <span className="ml-2 text-xs text-gray-500">on {new Date(record.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="ml-4 px-3 py-1.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full text-xs font-semibold text-white shadow-sm">New PR</div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden border-0">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <LineChart className="h-5 w-5 text-blue-500" />
          Performance Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="mb-6 w-full bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="progress" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600">
              Lift Progress
            </TabsTrigger>
            <TabsTrigger value="volume" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-600">
              Weekly Volume
            </TabsTrigger>
            <TabsTrigger value="records" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-amber-600">
              Personal Records
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="pt-2">
            {renderLineChart()}
          </TabsContent>
          
          <TabsContent value="volume">
            {renderBarChart()}
          </TabsContent>
          
          <TabsContent value="records">
            {renderPRChart()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProgressChart; 