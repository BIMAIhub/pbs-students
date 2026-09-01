import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 2, prefix = '', suffix = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo equivalent
        onUpdate: (val) => {
          setDisplayValue(Math.floor(val).toLocaleString('en-IN'));
        },
      });
      return controls.stop;
    }
  }, [value, duration, isInView]);

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
};
