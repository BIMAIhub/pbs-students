import React, { useEffect, useState } from 'react';

export const CursorFollower: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], .interactive-hover');
        setIsHovered(!!isInteractive);
      }
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentScroll = window.scrollY;
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth physics lerp for the trailing ring
    const loop = () => {
      setTrailPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.28,
        y: prev.y + (position.y - prev.y) * 0.28,
      }));
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y, isVisible]);

  return (
    <>
      {/* Top Viewport Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-200/50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 transition-all duration-150 ease-out shadow-sm"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {isVisible && (
        <>
          {/* Small Precision Center Pointer Dot */}
          <div
            className="fixed top-0 left-0 w-2.5 h-2.5 bg-emerald-600 rounded-full pointer-events-none z-50 transition-transform duration-75 ease-out shadow-xs"
            style={{
              transform: `translate3d(${position.x - 5}px, ${position.y - 5}px, 0) scale(${
                isHovered ? 1.6 : 1
              })`,
            }}
          />

          {/* Trailing Outer Smooth Glow Ring */}
          <div
            className={`fixed top-0 left-0 rounded-full pointer-events-none z-40 transition-all duration-300 ease-out border ${
              isHovered
                ? 'w-14 h-14 border-emerald-500 bg-emerald-500/20 backdrop-blur-[1px] -translate-x-7 -translate-y-7 shadow-lg shadow-emerald-500/20'
                : 'w-9 h-9 border-emerald-400/60 bg-emerald-400/5 -translate-x-[18px] -translate-y-[18px]'
            }`}
            style={{
              transform: `translate3d(${trailPos.x}px, ${trailPos.y}px, 0) ${
                isHovered ? 'scale(1.25)' : 'scale(1)'
              }`,
            }}
          />
        </>
      )}
    </>
  );
};
