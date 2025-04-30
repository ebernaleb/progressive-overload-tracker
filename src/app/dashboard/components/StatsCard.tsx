import React from "react";
import { motion } from "framer-motion";
import { StatsCardProps } from "./types";

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  colors,
  delay,
  icon,
}) => {
  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: delay + 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const gradientStyle = {
    background: `linear-gradient(135deg, ${colors[0]}10 0%, ${colors[1]}20 100%)`,
    borderLeft: `4px solid ${colors[0]}`,
  };

  const iconStyle = {
    background: `linear-gradient(135deg, ${colors[0]}20 0%, ${colors[1]}40 100%)`,
    color: colors[0],
  };

  return (
    <motion.div
      className="h-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
      style={gradientStyle}
      initial="hidden"
      animate="show"
      variants={container}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="p-3 rounded-xl" 
            style={iconStyle}
          >
            {icon}
          </div>
          <motion.h3 
            className="text-base font-semibold text-gray-700" 
            variants={item}
          >
            {title}
          </motion.h3>
        </div>
        <motion.div className="mt-2" variants={item}>
          <motion.p
            className="text-4xl font-bold text-gray-800 mb-1"
            variants={item}
          >
            {value}
          </motion.p>
          {subtitle && (
            <motion.p 
              className="text-sm font-medium text-gray-500 mt-1" 
              variants={item}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatsCard; 