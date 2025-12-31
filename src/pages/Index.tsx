import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import ParticleCanvas from '@/components/ParticleCanvas';
import HeroSection from '@/components/HeroSection';
import WishSection from '@/components/WishSection';
import MemoriesSection from '@/components/MemoriesSection';
import TimeSection from '@/components/TimeSection';
import FutureSection from '@/components/FutureSection';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const friendName = "My Sonajiiiiiii"; // Customize this name

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <main className="relative min-h-screen overflow-x-hidden">
          {/* Global particle canvas */}
          <ParticleCanvas />

          {/* Background gradient that follows scroll */}
          <div 
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(138, 43, 226, 0.15) 0%, transparent 50%)',
            }}
          />
          <div 
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, rgba(255, 215, 0, 0.1) 0%, transparent 40%)',
            }}
          />

          {/* Content sections */}
          <div className="relative z-10">
            <HeroSection friendName={friendName} />
            <WishSection />
            <MemoriesSection />
            <TimeSection />
            <FutureSection />

            {/* Footer */}
            <footer className="relative py-16 text-center">
              <div className="flex justify-center gap-4 mb-8">
                {['✦', '◦', '✦', '◦', '✦'].map((char, i) => (
                  <span 
                    key={i} 
                    className={`text-lg ${i % 2 === 0 ? 'text-primary' : 'text-secondary'} opacity-50`}
                  >
                    {char}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                Made with ✨ for a special person
              </p>
            </footer>
          </div>
        </main>
      )}
    </>
  );
};

export default Index;
