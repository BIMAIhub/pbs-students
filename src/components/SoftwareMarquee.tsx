import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layers, Cpu, Box, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';

export const SoftwareMarquee: React.FC = () => {
  const [activeCuriosity, setActiveCuriosity] = useState<number>(0);

  const softwareList = [
    { 
      name: 'Autodesk Revit', 
      tag: 'AR, ST, MEP', 
      color: 'border-sky-500/60 text-sky-300 bg-sky-950/40 hover:bg-sky-900/60',
      curiosity: 'Parametric 3D Modeling & Multi-Discipline Coordinated BIM Models. Generates real-time 2D shop drawings from 3D models.'
    },
    { 
      name: 'Navisworks Manage', 
      tag: 'Clash Matrix & 4D', 
      color: 'border-emerald-500/60 text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60',
      curiosity: 'Hard & Clearance Clash Detection Matrix between Structural, MEP & Architectural trades. Includes 4D TimeLiner construction sequence.'
    },
    { 
      name: 'Dynamo BIM', 
      tag: 'Visual Automation', 
      color: 'border-purple-500/60 text-purple-300 bg-purple-950/40 hover:bg-purple-900/60',
      curiosity: 'Visual programming node script automation. Automates 100+ sheet creations, parameter renames, and pipe sizing in seconds.'
    },
    { 
      name: 'Autodesk Civil 3D', 
      tag: 'Infrastructure', 
      color: 'border-rose-500/60 text-rose-300 bg-rose-950/40 hover:bg-rose-900/60',
      curiosity: 'Land development, corridor modeling, TIN surface topography, and cut/fill earthwork volume calculation.'
    },
    { 
      name: 'BIM 360 / ACC', 
      tag: 'Cloud Collab', 
      color: 'border-blue-500/60 text-blue-300 bg-blue-950/40 hover:bg-blue-900/60',
      curiosity: 'ISO 19650 Common Data Environment (CDE) cloud hosting for real-time model synchronization across international teams.'
    },
    { 
      name: 'Solibri Model Checker', 
      tag: 'QA/QC Validation', 
      color: 'border-amber-500/60 text-amber-300 bg-amber-950/40 hover:bg-amber-900/60',
      curiosity: 'Automated rule-based BIM quality checking, code compliance, accessibility audit, and COBie asset data validation.'
    },
  ];

  const companyLogos = [
    'WSP Global', 'Arup', 'L&T Construction', 'ALEC Engineering', 'Hafeez Contractor', 'Mott MacDonald', 'Arcadis', 'AtkinsRéalis'
  ];

  return (
    <section className="bg-slate-950 text-white py-12 border-y border-slate-800/80 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-extrabold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>INDUSTRY SOFTWARE MASTERY AT PBS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Comprehensive AEC & BIM Software Stack
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto">
            Click any software badge below to explore how PBS integrates real-world project workflows into the curriculum.
          </p>
        </div>

        {/* Software badges selector */}
        <div className="flex flex-wrap justify-center items-center gap-3">
          {softwareList.map((sw, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCuriosity(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all shadow-md ${sw.color} ${
                activeCuriosity === i ? 'ring-2 ring-emerald-400 border-emerald-400 scale-105 shadow-emerald-950' : 'opacity-85'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>{sw.name}</span>
              <span className="opacity-75 text-[10px] font-mono">({sw.tag})</span>
            </motion.button>
          ))}
        </div>

        {/* Dynamic Curiosity Detail Card */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCuriosity}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/60 p-5 rounded-3xl border border-emerald-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="text-xs font-black text-emerald-400 flex items-center justify-center sm:justify-start gap-2">
                  <Box className="w-4 h-4 text-amber-300" />
                  <span>{softwareList[activeCuriosity].name} — Workflow Capability</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {softwareList[activeCuriosity].curiosity}
                </p>
              </div>

              <div className="bg-emerald-950/80 px-4 py-2 rounded-2xl border border-emerald-500/40 text-[11px] font-extrabold text-emerald-300 flex items-center gap-1.5 flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>100% Practical Project Hand-on</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Company Alumni Connections Banner */}
        <div className="pt-6 border-t border-slate-800/80">
          <p className="text-center text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">
            PBS Alumni & Mentors are connected with top AEC Companies Worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-slate-400 font-bold text-xs sm:text-sm">
            {companyLogos.map((comp, i) => (
              <span key={i} className="hover:text-emerald-300 transition-colors cursor-default opacity-80 hover:opacity-100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                {comp}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
