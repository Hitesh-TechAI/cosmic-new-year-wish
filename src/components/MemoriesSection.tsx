import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface MemoryCard {
  id: number;
  text: string;
  color: 'gold' | 'cyan' | 'rose' | 'purple';
}

const MemoriesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallax1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const parallax3 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const memories: MemoryCard[] = [
    { id: 1, text: "Every laugh we shared", color: 'gold' },
    { id: 2, text: "The adventures we took", color: 'cyan' },
    { id: 3, text: "Late night conversations", color: 'rose' },
    { id: 4, text: "Your unwavering support", color: 'purple' },
    { id: 5, text: "Moments of pure joy", color: 'gold' },
    { id: 6, text: "The memories we made", color: 'cyan' },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'gold':
        return {
          border: 'border-primary/30',
          glow: '0 0 30px rgba(255, 215, 0, 0.2)',
          bg: 'rgba(255, 215, 0, 0.05)',
          text: 'text-primary',
        };
      case 'cyan':
        return {
          border: 'border-secondary/30',
          glow: '0 0 30px rgba(0, 245, 255, 0.2)',
          bg: 'rgba(0, 245, 255, 0.05)',
          text: 'text-secondary',
        };
      case 'rose':
        return {
          border: 'border-rose/30',
          glow: '0 0 30px rgba(255, 107, 157, 0.2)',
          bg: 'rgba(255, 107, 157, 0.05)',
          text: 'text-rose',
        };
      case 'purple':
        return {
          border: 'border-accent/30',
          glow: '0 0 30px rgba(138, 43, 226, 0.2)',
          bg: 'rgba(138, 43, 226, 0.05)',
          text: 'text-accent-foreground',
        };
      default:
        return {
          border: 'border-border',
          glow: 'none',
          bg: 'transparent',
          text: 'text-foreground',
        };
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          style={{ 
            y: parallax2,
            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20"
        />
        <motion.div 
          style={{ 
            y: parallax1,
            background: 'radial-gradient(circle, rgba(255, 107, 157, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full opacity-15"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-3 text-rose text-sm tracking-[0.3em] uppercase font-body mb-6">
            <span className="w-8 h-px bg-rose" />
            Cherished Moments
            <span className="w-8 h-px bg-rose" />
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground">
            A Year of <span className="gradient-text-aurora">Beautiful</span> Memories
          </h2>
        </motion.div>

        {/* Memory cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory, index) => {
            const colors = getColorClasses(memory.color);
            const parallaxValue = index % 3 === 0 ? parallax1 : index % 3 === 1 ? parallax2 : parallax3;
            
            return (
              <motion.div
                key={memory.id}
                style={{ 
                  y: parallaxValue,
                  background: colors.bg,
                  boxShadow: colors.glow,
                }}
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className={`
                  relative p-8 rounded-2xl border ${colors.border}
                  backdrop-blur-xl cursor-pointer
                  transition-all duration-500 card-hover group
                `}
              >
                {/* Decorative corner */}
                <div 
                  className={`absolute top-4 right-4 w-2 h-2 rounded-full ${colors.text} opacity-60`}
                  style={{ 
                    boxShadow: colors.glow,
                    background: 'currentColor',
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  <span className={`text-5xl font-display ${colors.text} opacity-20`}>
                    {String(memory.id).padStart(2, '0')}
                  </span>
                  <p className="mt-4 text-xl font-display text-foreground">
                    {memory.text}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-30"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MemoriesSection;
