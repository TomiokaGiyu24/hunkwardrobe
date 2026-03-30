import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function ParticlesBackground({ count = 30, color = 'rgba(255,100,0,0.4)', maxSize = 8, minSize = 2 }) {
  // Generate static random positions so they don't jump around on re-renders,
  // but let framer motion handle the smooth drifting.
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      xStart: Math.random() * 100,
      yStart: Math.random() * 100,
      xEnd: Math.random() * 100,
      yEnd: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      duration: 15 + Math.random() * 25,
      delay: Math.random() * -20, // Negative delay to start immediately mid-animation
      opacity: 0.1 + Math.random() * 0.5,
    }));
  }, [count, maxSize, minSize]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.xStart}vw`,
            y: `${p.yStart}vh`,
          }}
          animate={{
            x: [`${p.xStart}vw`, `${p.xEnd}vw`, `${Math.random() * 100}vw`],
            y: [`${p.yStart}vh`, `${p.yEnd}vh`, `${Math.random() * 100}vh`],
            scale: [1, 1.5, 1],
            opacity: [p.opacity, p.opacity * 0.4, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: "easeInOut",
            delay: p.delay,
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
          }}
        />
      ))}
    </div>
  );
}
