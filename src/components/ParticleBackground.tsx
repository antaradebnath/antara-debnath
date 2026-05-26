import React, { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 60;

    // Initialize particles
    const initParticles = (w: number, h: number) => {
      particles.length = 0;
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    // Resize handler using ResizeObserver as requested
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        // Apply device pixel ratio for crisp rendering
        const dpr = window.devicePixelRatio || 1;
        canvas.width = entryWidth * dpr;
        canvas.height = entryHeight * dpr;
        canvas.style.width = `${entryWidth}px`;
        canvas.style.height = `${entryHeight}px`;
        ctx.scale(dpr, dpr);

        width = entryWidth;
        height = entryHeight;
        initParticles(width, height);
      }
    });

    resizeObserver.observe(container);

    // Mouse tracking for subtle visual attractor fields
    let mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw elegant background charcoal circles (Art concept)
      ctx.strokeStyle = "rgba(40, 40, 50, 0.15)";
      ctx.lineWidth = 1;
      
      // Fine-art golden ratio orbits centered on canvas
      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.25;

      for (let j = 1; j <= 4; j++) {
        ctx.beginPath();
        // Create slightly squashed orbits simulating hand-drawn sketched ellipses
        ctx.ellipse(
          centerX, 
          centerY, 
          baseRadius * j * 0.8, 
          baseRadius * j * 0.4, 
          Math.PI / 6, 
          0, 
          2 * Math.PI
        );
        ctx.stroke();
      }

      // 2. Animate and draw neural nodes (AI concept)
      particles.forEach((p, idx) => {
        // Apply velvet drifting motion
        p.x += p.vx;
        p.y += p.vy;

        // Bounce walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interactive mouse gravity push/pull
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            // Drifts gently towards or away from the cursor
            p.x += (dx / dist) * force * 0.5;
            p.y += (dy / dist) * force * 0.5;
          }
        }

        // Render point
        ctx.fillStyle = `rgba(147, 51, 234, ${p.alpha})`; // Purple neural color
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fill();

        // 3. Draw interparticle edge links
        for (let k = idx + 1; k < particles.length; k++) {
          const other = particles[k];
          const dist = Math.hypot(p.x - other.x, p.y - other.y);
          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.12;
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`; // Cyan link colors
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      if (canvas) {
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div id="particle-bg-container" ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#0a0a0c]">
      <canvas id="particle-bg-canvas" ref={canvasRef} className="block pointer-events-auto" />
    </div>
  );
}
