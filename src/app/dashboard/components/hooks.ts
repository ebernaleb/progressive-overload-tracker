import { useState, useCallback } from "react";
import { useSpring } from "framer-motion";

// Custom hook for expandable sections
export function useExpandable(initialState = false) {
  const [isExpanded, setIsExpanded] = useState(initialState);
  const springConfig = { stiffness: 300, damping: 30 };
  const animatedHeight = useSpring(0, springConfig);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return { isExpanded, toggleExpand, animatedHeight };
}

// Utility function for random integers
export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}; 