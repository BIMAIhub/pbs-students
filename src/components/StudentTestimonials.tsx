import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/pbsData';
import { Testimonial } from '../types';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Play, 
  X, 
  Sparkles,
  Building2,
  Globe
} from 'lucide-react';

export const StudentTestimonials: React.FC = () => {
  const [activeVideoModal, setActiveVideoModal] = useState<Testimonial | null>(null);

  return (
    <section id="testimonials-section" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-emerald-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>ALUMNI TRUST & REVIEWS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Success Stories of Our Learners <span className="text-emerald-600">Post Certification</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Hear from engineers and architects across 5 countries who transformed their AEC careers with Pragmatic BIM Solution.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between space-y-6 relative group"
            >
              <div className="space-y-4">
                
                {/* Header User Row */}
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                    }}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1">
                      {t.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    </h3>
                    <div className="text-xs text-emerald-700 font-semibold">{t.role} at {t.company}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-slate-400" />
                      <span>{t.country}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-600 leading-relaxed italic relative">
                  "{t.comment}"
                </p>

              </div>

              {/* Course Taken Tag */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md line-clamp-1">
                  {t.courseTaken}
                </span>

                <button
                  onClick={() => setActiveVideoModal(t)}
                  className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors flex-shrink-0"
                  title="Watch Video Review"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Video Story Modal Simulation */}
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-6 border border-slate-700 relative space-y-4">
              <button
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <img
                  src={activeVideoModal.avatar}
                  alt={activeVideoModal.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                />
                <div>
                  <h4 className="font-bold text-sm">{activeVideoModal.name}</h4>
                  <div className="text-xs text-emerald-400">{activeVideoModal.role} ({activeVideoModal.company})</div>
                </div>
              </div>

              {/* Simulated Video Player */}
              <div className="bg-slate-950 rounded-2xl h-64 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden p-6 text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-900/50 animate-bounce">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <div className="text-xs font-bold text-emerald-300">
                  Student Interview: "How Pragmatic BIM Solution Boosted My Career in GCC"
                </div>
                <div className="text-[10px] text-slate-500">
                  Course: {activeVideoModal.courseTaken}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-800 p-3 rounded-xl">
                "{activeVideoModal.comment}"
              </p>

              <button
                onClick={() => setActiveVideoModal(null)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl"
              >
                Close Video Player
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
