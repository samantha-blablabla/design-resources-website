'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from './CursorContext';

const CustomCursor = () => {
  const { cursorState } = useCursor();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement
  const springConfig = { stiffness: 500, damping: 28 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', manageMouseMove);
    return () => window.removeEventListener('mousemove', manageMouseMove);
  }, [mouseX, mouseY]);

  const variants = {
    default: {
      height: 16,
      width: 16,
      x: -8,
      y: -8,
      backgroundColor: "white",
      mixBlendMode: "difference" as any,
    },
    text: {
      height: 80,
      width: 80,
      x: -40,
      y: -40,
      backgroundColor: "white",
      mixBlendMode: "difference" as any,
    },
  };

  return (
    <motion.div
      style={{
        left: smoothX,
        top: smoothY,
        position: 'fixed',
        zIndex: 9999,
        pointerEvents: 'none',
        borderRadius: '50%',
      }}
      variants={variants}
      animate={cursorState.type}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="flex items-center justify-center overflow-hidden"
    >
      {cursorState.label && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="text-black text-[10px] font-bold tracking-widest uppercase"
        >
          {cursorState.label}
        </motion.span>
      )}
    </motion.div>
  );
};

export default CustomCursor;
