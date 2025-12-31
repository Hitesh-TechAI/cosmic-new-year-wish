import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const FutureSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const hopes = [
    { icon: "✨", text: "May your dreams take flight" },
    { icon: "💫", text: "May success follow your every step" },
    { icon: "🌟", text: "May happiness fill your days" },
    { icon: "⭐", text: "May love surround you always" },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden"
    >
      {/* Rising light effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[800px]"
        >
          <div 
            className="w-full h-full"
            style={{
              background: 'linear-gradient(to top, rgba(255, 215, 0, 0.15) 0%, rgba(0, 245, 255, 0.1) 30%, transparent 60%)',
            }}
          />
        </motion.div>
        
        {/* Floating orbs */}
        <motion.div 
          style={{ 
            y: y2,
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
          className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full animate-gentle-pulse"
        />
        <motion.div 
          style={{ 
            y: y1,
            background: 'radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animationDelay: '-2s',
          }}
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full animate-gentle-pulse"
        />
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-3 text-secondary text-sm tracking-[0.3em] uppercase font-body">
            <span className="w-8 h-px bg-secondary" />
            The Future Awaits
            <span className="w-8 h-px bg-secondary" />
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl text-foreground mb-8"
        >
          Here's to an <span className="gradient-text-gold text-glow-gold">extraordinary</span> year ahead
        </motion.h2>

        {/* Hopes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 mb-20">
          {hopes.map((hope, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.4 + index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group p-6 rounded-2xl glass border border-border/20 hover:border-primary/30 transition-all duration-500"
              style={{
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <motion.span
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
                className="text-4xl block mb-4"
              >
                {hope.icon}
              </motion.span>
              <p className="font-display text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                {hope.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            May 2025 bring you everything your heart desires and more. 
            Thank you for being an incredible friend.
          </p>

          {/* Signature area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="inline-flex flex-col items-center"
          >
            <span className="text-sm text-muted-foreground tracking-widest uppercase mb-2">With love</span>
            <span className="font-display text-3xl gradient-text-aurora">Your Friend</span>
          </motion.div>
        </motion.div>

        {/* Rising stars decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-24 flex justify-center gap-4"
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{ 
                duration: 2 + i * 0.3, 
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="text-2xl text-primary"
            >
              ✦
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FutureSection;
