import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  type: 'star' | 'glow' | 'sparkle';
}

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  const colors = [
    'rgba(255, 215, 0, ',    // Gold
    'rgba(0, 245, 255, ',    // Cyan
    'rgba(255, 107, 157, ',  // Rose
    'rgba(255, 255, 255, ',  // White
    'rgba(138, 43, 226, ',   // Purple
  ];

  const createParticle = useCallback((x?: number, y?: number): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Particle;

    const types: ('star' | 'glow' | 'sparkle')[] = ['star', 'glow', 'sparkle'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5 - 0.2,
      size: type === 'star' ? Math.random() * 2 + 1 : Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 300 + 200,
      type,
    };
  }, []);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000));
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle());
  }, [createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.01;
      
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.life++;
        
        // Noise-based movement
        const noise = Math.sin(timeRef.current + particle.x * 0.01) * Math.cos(timeRef.current + particle.y * 0.01);
        particle.vx += noise * 0.02;
        particle.vy += Math.sin(timeRef.current * 0.5) * 0.01;
        
        // Mouse influence
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200 * 0.02;
          particle.vx += dx * force * 0.01;
          particle.vy += dy * force * 0.01;
        }

        // Apply velocity with damping
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Calculate opacity based on life
        const lifeRatio = particle.life / particle.maxLife;
        const fadeIn = Math.min(1, particle.life / 30);
        const fadeOut = lifeRatio > 0.7 ? 1 - ((lifeRatio - 0.7) / 0.3) : 1;
        const currentOpacity = particle.opacity * fadeIn * fadeOut;

        // Draw particle based on type
        ctx.save();
        
        if (particle.type === 'star') {
          const twinkle = Math.sin(timeRef.current * 3 + particle.x) * 0.3 + 0.7;
          ctx.fillStyle = particle.color + (currentOpacity * twinkle) + ')';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === 'glow') {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          gradient.addColorStop(0, particle.color + currentOpacity + ')');
          gradient.addColorStop(0.5, particle.color + (currentOpacity * 0.3) + ')');
          gradient.addColorStop(1, particle.color + '0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Sparkle - cross shape
          const sparkleSize = particle.size * (0.8 + Math.sin(timeRef.current * 5 + particle.y) * 0.2);
          ctx.strokeStyle = particle.color + currentOpacity + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x - sparkleSize, particle.y);
          ctx.lineTo(particle.x + sparkleSize, particle.y);
          ctx.moveTo(particle.x, particle.y - sparkleSize);
          ctx.lineTo(particle.x, particle.y + sparkleSize);
          ctx.stroke();
        }
        
        ctx.restore();

        // Reset particle when life ends or goes off screen
        if (particle.life > particle.maxLife || 
            particle.x < -50 || particle.x > canvas.width + 50 ||
            particle.y < -50 || particle.y > canvas.height + 50) {
          particlesRef.current[index] = createParticle();
        }
      });

      // Occasional new particles near mouse
      if (Math.random() < 0.1) {
        particlesRef.current.push(createParticle(
          mouseRef.current.x + (Math.random() - 0.5) * 100,
          mouseRef.current.y + (Math.random() - 0.5) * 100
        ));
        if (particlesRef.current.length > 200) {
          particlesRef.current.shift();
        }
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [createParticle, initParticles]);

  return (
    <canvas 
      ref={canvasRef} 
      className="particle-canvas"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleCanvas;
