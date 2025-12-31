import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const TimeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Time particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInView) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      char: string;
    }> = [];

    const chars = ['2', '0', '2', '4', '→', '2', '0', '2', '5', '✦', '◦', '∞'];
    
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        char: chars[Math.floor(Math.random() * chars.length)],
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach(p => {
        p.y -= p.speed;
        p.opacity -= 0.001;

        if (p.y < -50 || p.opacity <= 0) {
          p.y = canvas.offsetHeight + 50;
          p.x = Math.random() * canvas.offsetWidth;
          p.opacity = Math.random() * 0.3 + 0.1;
        }

        ctx.save();
        ctx.font = `${p.size}px "Playfair Display", serif`;
        ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
        ctx.textAlign = 'center';
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden"
    >
      {/* Time particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      />

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          style={{ rotate }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        >
          <div 
            className="w-full h-full rounded-full opacity-10"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(255, 215, 0, 0.3), transparent, rgba(0, 245, 255, 0.3), transparent)',
            }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-3 text-primary text-sm tracking-[0.3em] uppercase font-body">
            <span className="w-8 h-px bg-primary" />
            Time & Transformation
            <span className="w-8 h-px bg-primary" />
          </span>
        </motion.div>

        {/* Year transition */}
        <motion.div
          style={{ scale }}
          className="flex items-center justify-center gap-8 mb-16"
        >
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display text-6xl sm:text-8xl md:text-9xl text-muted-foreground/30"
          >
            2024
          </motion.span>
          
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center"
          >
            <div className="w-16 h-px bg-gradient-to-r from-muted-foreground/20 to-primary" />
            <motion.span
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-4 text-primary text-3xl"
            >
              →
            </motion.span>
            <div className="w-16 h-px bg-gradient-to-r from-primary to-primary-glow" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-display text-6xl sm:text-8xl md:text-9xl gradient-text-gold text-glow-gold"
          >
            2025
          </motion.span>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="space-y-6"
        >
          <p className="font-display text-2xl sm:text-3xl text-foreground">
            Every ending is a new beginning
          </p>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            As the old year fades into memory, a new chapter awaits—full of possibilities, 
            adventures, and moments yet to be discovered.
          </p>
        </motion.div>

        {/* Decorative clock elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 flex justify-center gap-8"
        >
          {[12, 3, 6, 9].map((num, i) => (
            <motion.div
              key={num}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="w-3 h-3 rounded-full bg-primary"
              style={{
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TimeSection;
