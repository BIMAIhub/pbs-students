import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/pbsData';
import { 
  ShieldCheck, 
  Award, 
  Layers, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  HeartHandshake, 
  GraduationCap,
  Building
} from 'lucide-react';

export const WhyChoosePBS: React.FC = () => {
  const differentiators = [
    {
      title: '15 Years AEC Industry Experience',
      desc: 'Our instructors do not just teach theory — they actively manage massive global BIM projects like the Al ULA Saudi Arabia resort development and central chiller plant rooms.',
      icon: Award,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200'
    },
    {
      title: 'Word-Of-Mouth Trust Guarantee',
      desc: '"No Marketing Other than... Word-Of-Mouth." Our growth across 5 countries is driven entirely by student recommendations and engineer trust.',
      icon: HeartHandshake,
      color: 'bg-amber-500/10 text-amber-600 border-amber-200'
    },
    {
      title: '100% Real Project BIM Files',
      desc: 'Train with actual multi-discipline Revit models (.rvt), Navisworks clash sets (.nwd), and Dynamo automation scripts used on real site executions.',
      icon: Layers,
      color: 'bg-blue-500/10 text-blue-600 border-blue-200'
    },
    {
      title: '100+ Engineers Trained in 5 Countries',
      desc: 'Join a strong alumni community of engineers working at top AEC consultancy firms across India, GCC, UK, and Europe.',
      icon: Users,
      color: 'bg-purple-500/10 text-purple-600 border-purple-200'
    }
  ];

  return (
    <section id="why-pbs-section" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-emerald-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>WHAT SETS US APART</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Find Out More About <span className="text-emerald-600">Learning Experience</span> at Pragmatic BIM Solution
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Built on 15 years of AEC engineering mastery, we bridge the gap between classroom theory and real site execution.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" />
                  <span>Verified PBS Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Highlight Banner (Replicating Slide 4) */}
        <div className="mt-12 bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="space-y-2 max-w-2xl">
              <span className="text-emerald-300 text-xs font-mono uppercase tracking-widest font-bold">
                OUR CORE PHILOSOPHY
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                "No Marketing Other than... Word-Of-Mouth"
              </h3>
              <p className="text-emerald-100 text-sm font-serif italic text-lg">
                It's All About Trust.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center flex-shrink-0">
              <div className="text-3xl font-black text-amber-300">100+</div>
              <div className="text-xs text-white font-bold uppercase tracking-wider mt-0.5">Engineers Trained</div>
              <div className="text-[10px] text-emerald-200">Across 5 Countries</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
