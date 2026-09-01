import React, { useState, useEffect } from 'react';
import { Sparkles, Timer, Tag, ArrowRight, X, Gift, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PromotionsBannerProps {
  onOpenPromotionsHub: () => void;
  onApplyCoupon?: (code: string) => void;
}

export const PromotionsBanner: React.FC<PromotionsBannerProps> = ({
  onOpenPromotionsHub,
  onApplyCoupon
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);

  // Live Countdown to end of month
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 14,
    minutes: 32,
    seconds: 48
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('BIMPRO2026');
    setCopiedCode(true);
    if (onApplyCoupon) onApplyCoupon('BIMPRO2026');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="relative z-50 bg-gradient-to-r from-emerald-950 via-slate-950 to-teal-950 border-b border-emerald-500/40 text-white overflow-hidden">
        {/* Ambient Subtle Tech Grid & Cyber Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0596690a_1px,transparent_1px),linear-gradient(to_bottom,#0596690a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-2.5 relative z-10 text-xs">
          {/* Left: Badge & Offer Headline */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
              <Sparkles className="w-3 h-3 text-slate-950" />
              <span>2026 Mega Offer</span>
            </span>

            <span className="font-extrabold text-white flex items-center gap-1.5 tracking-tight">
              <span className="text-emerald-400 font-black">40% Early-Bird Scholarship</span>
              <span className="hidden md:inline text-slate-300">on All Multi-Disciplinary BIM Programs</span>
            </span>

            {/* Promo Code Quick Copy Chip */}
            <button
              onClick={handleCopyCode}
              title="Click to copy coupon code"
              className="inline-flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 px-2.5 py-0.5 rounded-lg font-mono font-bold transition-all hover:scale-105 active:scale-95 shadow-xs"
            >
              <Tag className="w-3 h-3 text-amber-300" />
              <span>BIMPRO2026</span>
              {copiedCode ? (
                <Check className="w-3 h-3 text-emerald-400 animate-scaleIn" />
              ) : (
                <span className="text-[9px] text-amber-300 bg-amber-400/20 px-1 py-0.2 rounded font-sans">COPY</span>
              )}
            </button>
          </div>

          {/* Right: Live Countdown + Action Button */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            {/* Countdown timer */}
            <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-300 bg-slate-900/80 px-3 py-1 rounded-xl border border-emerald-500/30 font-mono">
              <Timer className="w-3.5 h-3.5 text-amber-400 mr-1 animate-pulse" />
              <span className="font-bold text-white">{timeLeft.days}d</span>:
              <span className="font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}h</span>:
              <span className="font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}m</span>:
              <span className="font-bold text-emerald-400">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>

            {/* Claim / Hub Trigger Button */}
            <button
              onClick={onOpenPromotionsHub}
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-black text-xs px-3 sm:px-4 py-1.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 hover:scale-105 active:scale-95 group"
            >
              <Gift className="w-3.5 h-3.5 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>Claim Scholarship & Deals</span>
              <ArrowRight className="w-3 h-3 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Dismiss */}
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};
