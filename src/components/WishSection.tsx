import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const WishSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  const wishLines = [
  "As the clock strikes midnight,",
  "may this new year bring us endless joy and quiet strength,",
  "your love that held me steady,",
  "my love that never left you,",
  "and all the dreams we’ll dare to chase together."
];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      {/* Section header */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-3 text-secondary text-sm tracking-[0.3em] uppercase font-body">
            <span className="w-8 h-px bg-secondary" />
            The Wish
            <span className="w-8 h-px bg-secondary" />
          </span>
        </motion.div>

        {/* Main wish text */}
        <div ref={textRef} className="space-y-4">
          {wishLines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                filter: 'blur(0px)' 
              } : {}}
              transition={{ 
                duration: 1, 
                delay: index * 0.3,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-relaxed"
              style={{
                textShadow: '0 0 40px rgba(255, 255, 255, 0.1)',
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Decorative quote marks */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute -top-8 -left-8 text-9xl font-display text-primary"
          style={{ lineHeight: 1 }}
        >
          "
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.7 }}
          className="absolute -bottom-8 -right-8 text-9xl font-display text-primary rotate-180"
          style={{ lineHeight: 1 }}
        >
          "
        </motion.div>

        {/* Glowing line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="mt-16 h-px w-full max-w-md mx-auto"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(45 100% 50% / 0.5), transparent)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
          }}
        />
      </div>
    </section>
  );
};

export default WishSection;
