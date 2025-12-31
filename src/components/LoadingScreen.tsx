import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const easeOut = 1 - Math.pow(1 - currentStep / steps, 3);
      setProgress(Math.min(100, easeOut * 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Central glowing orb */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative mb-12"
      >
        <div 
          className="w-32 h-32 rounded-full animate-gentle-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-24 h-24 rounded-full border border-primary/30" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full border border-secondary/20" />
        </motion.div>
        
        {/* Center star */}
        <motion.span
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center text-4xl text-primary"
        >
          ✦
        </motion.span>
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-display text-xl text-foreground mb-8"
      >
        Preparing something special...
      </motion.p>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, hsl(45 100% 50%), hsl(185 100% 50%))',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
          }}
          animate={{ 
            opacity: [0, 0.5, 0],
            y: [null, Math.random() * -100 - 50],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          className="absolute w-1 h-1 rounded-full bg-primary"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </motion.div>
  );
};

export default LoadingScreen;
