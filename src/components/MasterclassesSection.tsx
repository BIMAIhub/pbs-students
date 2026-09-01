import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MASTERCLASSES } from '../data/pbsData';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  UserCheck, 
  CheckCircle2, 
  ShieldCheck,
  Zap
} from 'lucide-react';

export const MasterclassesSection: React.FC = () => {
  const [registeredId, setRegisteredId] = useState<string | null>(null);

  return (
    <section className="py-16 bg-amber-50/40 text-slate-900 relative border-t border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>WEEKEND LIVE WORKSHOPS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Our Powerful <span className="text-amber-600">Masterclasses</span> to Unlock Your Potential
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            Intensive 3-hour live weekend sessions led by senior BIM consultants with 15+ years of hands-on project experience.
          </p>
        </motion.div>

        {/* Masterclass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MASTERCLASSES.map((mc, idx) => {
            const isRegistered = registeredId === mc.id;

            return (
              <motion.div
                key={mc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-5 relative overflow-hidden group"
              >
                {/* Category Badge */}
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-amber-100 text-amber-900 font-extrabold px-3 py-1 rounded-full border border-amber-300">
                    {mc.category}
                  </span>
                  <span className="text-rose-600 text-[11px] font-bold animate-pulse">
                    🔥 Only {mc.seatsLeft} seats left
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                    {mc.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Mentor: {mc.instructor}
                  </p>
                </div>

                {/* Meta details */}
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>{mc.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{mc.time} ({mc.duration})</span>
                  </div>
                </div>

                {/* Price & Registration */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">₹{mc.price}</span>
                      <span className="text-xs text-slate-400 line-through">₹{mc.originalPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setRegisteredId(mc.id)}
                    disabled={isRegistered}
                    className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 ${
                      isRegistered
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Seat Booked!</span>
                      </>
                    ) : (
                      <>
                        <span>Reserve Seat</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

