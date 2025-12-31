import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
  friendName: string;
}

const HeroSection = ({ friendName }: HeroSectionProps) => {
  const [showContent, setShowContent] = useState(false);
  const [revealedLetters, setRevealedLetters] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const mainText = "Happy New Year";
  const fullText = mainText + ", " + friendName;

  useEffect(() => {
    // Initial reveal animation
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showContent) return;
    
    const interval = setInterval(() => {
      setRevealedLetters(prev => {
        if (prev >= fullText.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [showContent, fullText.length]);

  const renderAnimatedText = () => {
    return fullText.split('').map((letter, index) => {
      const isRevealed = index < revealedLetters;
      const isName = index >= mainText.length + 2; // After ", "
      
      return (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ${
            isRevealed 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          } ${isName ? 'gradient-text-gold' : ''}`}
          style={{
            transitionDelay: `${index * 50}ms`,
            textShadow: isRevealed 
              ? isName 
                ? '0 0 40px rgba(255, 215, 0, 0.8), 0 0 80px rgba(255, 215, 0, 0.4)' 
                : '0 0 30px rgba(255, 255, 255, 0.5)'
              : 'none',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      );
    });
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity, scale, y }}
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full animate-gentle-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, rgba(138, 43, 226, 0.05) 50%, transparent 70%)',
          }}
        />
        
        {/* Floating orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full animate-float opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(0, 245, 255, 0.4) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full animate-float opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 157, 0.4) 0%, transparent 70%)',
            filter: 'blur(30px)',
            animationDelay: '-3s',
          }}
        />
        <div 
          className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full animate-cosmic-drift opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.5) 0%, transparent 70%)',
            filter: 'blur(15px)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Decorative element above */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="text-primary text-2xl animate-star-twinkle">✦</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        </motion.div>

        {/* Year badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-block px-6 py-2 glass-gold rounded-full text-sm font-body tracking-[0.3em] text-primary uppercase">
            2025
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-foreground leading-tight"
        >
          {renderAnimatedText()}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: revealedLetters >= fullText.length ? 1 : 0, 
            y: revealedLetters >= fullText.length ? 0 : 20 
          }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 text-lg sm:text-xl text-muted-foreground font-body max-w-2xl mx-auto"
        >
          A celebration of Love, sweet memories, and out beautiful journey ahead TOGETHER!!!!
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealedLetters >= fullText.length ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border border-primary/30 flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1], y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 bg-primary rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
