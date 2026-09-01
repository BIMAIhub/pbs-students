import React, { useState } from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO, PRELOADED_USERS } from '../data/pbsData';
import { HitechBimViewer } from './HitechBimViewer';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Award, 
  Users, 
  Building2, 
  ShieldCheck, 
  Play, 
  Calendar,
  Star,
  Cpu,
  Gift,
  Tag,
  Zap,
  Layers,
  GraduationCap,
  Lock,
  ChevronRight
} from 'lucide-react';
import { AuthUser } from '../types';

interface HeroSectionProps {
  currentUser?: AuthUser | null;
  onExploreCourses: () => void;
  onOpenCounselling: () => void;
  onOpenLms: () => void;
  onOpenPromotions?: () => void;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
  onQuickStudentLogin?: (user: AuthUser) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentUser,
  onExploreCourses,
  onOpenCounselling,
  onOpenLms,
  onOpenPromotions,
  onOpenAuth,
  onQuickStudentLogin
}) => {
  const [heroViewMode, setHeroViewMode] = useState<'3d_engine' | 'student_portal' | 'metrics'>('3d_engine');

  const studentUser = PRELOADED_USERS[1]; // Sneha Kulkarni student account

  return (
    <section className="relative overflow-hidden bg-white text-slate-900 pt-6 pb-16 lg:pt-10 lg:pb-24 border-b border-slate-100">
      {/* Background Subtle BIM Grid & Laser Cyber Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810d_1px,transparent_1px),linear-gradient(to_bottom,#10b9810d_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: High-Tech Copy & Direct Google Student CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-extrabold shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{COMPANY_INFO.experienceYears}+ Yrs AEC BIM Mastery</span>
              </div>

              {onOpenPromotions && (
                <button
                  onClick={onOpenPromotions}
                  className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-3.5 py-1 rounded-full shadow-xs transition-all hover:scale-105 active:scale-95"
                >
                  <Gift className="w-3.5 h-3.5 text-slate-950" />
                  <span>40% Early-Bird Scholarship Active</span>
                </button>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">High-Tech BIM, Revit & Digital Twins</span> from Real Industry Leads
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              End-to-end practical upskilling platform for <strong className="text-slate-900">Architects, Civil Engineers & MEP Specialists</strong>. Master ISO 19650 execution, LOD 400 Plant Rooms, Navisworks Clash Resolution & Dynamo Computational Automation.
            </p>

            {/* High-Tech Student Google Login Action Card */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border-2 border-emerald-500/80 shadow-xl relative overflow-hidden text-left space-y-3">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white uppercase tracking-wider block">
                      Student LMS & Classroom Access
                    </span>
                    <span className="text-[10px] text-emerald-300 font-mono">
                      Autodesk Verified Modules + PDF Certification
                    </span>
                  </div>
                </div>

                <span className="bg-emerald-500/20 text-[#00f59b] border border-emerald-500/40 text-[10px] font-mono px-2 py-0.5 rounded self-start sm:self-auto">
                  GOOGLE AUTH ACTIVE
                </span>
              </div>

              {/* Student Login Flow */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                {currentUser ? (
                  <button
                    onClick={onOpenLms}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:scale-102"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Open My Student LMS Portal ({currentUser.name})</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        if (onOpenAuth) onOpenAuth('signin');
                      }}
                      className="flex-1 bg-white hover:bg-slate-100 text-slate-900 font-black text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md hover:scale-102 border border-slate-200"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      <span>Student Login by Google</span>
                    </button>

                    {onQuickStudentLogin && (
                      <button
                        onClick={() => onQuickStudentLogin(studentUser)}
                        className="bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-white font-mono text-xs py-2.5 px-3 rounded-xl border border-emerald-500/40 flex items-center justify-center gap-1.5 transition-all"
                        title="Instant 1-click student demo"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-300" />
                        <span>1-Click Sneha</span>
                      </button>
                    )}
                  </>
                )}

                <button
                  onClick={onOpenLms}
                  className="bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 text-xs font-bold py-2.5 px-3 rounded-xl border border-emerald-500/40 flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Classroom Preview</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={onOpenCounselling}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 group"
              >
                <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>Book 1:1 Free BIM Counselling</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl border-2 border-slate-300 hover:border-emerald-500 shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <span>Browse All 6 Courses</span>
              </button>
            </div>

            {/* Feature Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-bold text-slate-800 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Real Project Models</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>ISO 19650 Standards</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Verified PDF Certificate</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: High-Tech Interactive 3D BIM Viewer Visualizer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* View Mode Toggle Header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Live BIM Digital Twin Sandbox
                </span>
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setHeroViewMode('3d_engine')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    heroViewMode === '3d_engine'
                      ? 'bg-slate-950 text-[#00f59b] font-mono shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>3D Digital Twin</span>
                </button>
                <button
                  onClick={() => setHeroViewMode('student_portal')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    heroViewMode === 'student_portal'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student LMS</span>
                </button>
                <button
                  onClick={() => setHeroViewMode('metrics')}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    heroViewMode === 'metrics'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Al ULA Project</span>
                </button>
              </div>
            </div>

            {/* TAB 1: High Tech BIM 3D Holographic Viewer */}
            {heroViewMode === '3d_engine' && (
              <HitechBimViewer onOpenLms={onOpenLms} onOpenAuth={onOpenAuth} />
            )}

            {/* TAB 2: Student LMS Quick Interactive Hub */}
            {heroViewMode === 'student_portal' && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-emerald-500 relative space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900">Student Learning Studio</h3>
                      <p className="text-xs text-slate-500">Self-Paced BIM Lab + Verified Certificates</p>
                    </div>
                  </div>

                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    2026 Curriculum
                  </span>
                </div>

                {/* Modules breakdown preview */}
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Module 1: Revit Architecture & Structure Modeling</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Completed
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                      <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                      <span>Module 2: MEP Plant Room Coordination & LOD 400</span>
                    </div>
                    <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded animate-pulse">
                      In Progress
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Lock className="w-4 h-4 text-slate-400" />
                      <span>Module 3: Navisworks Clash Matrix & 4D TimeLiner</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Unlocks at 50%
                    </span>
                  </div>
                </div>

                {/* Direct Launch CTA */}
                <button
                  onClick={onOpenLms}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md hover:scale-102"
                >
                  <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  <span>Launch Student LMS Classroom & Download Certificate</span>
                </button>
              </div>
            )}

            {/* TAB 3: Brand Executive Stats Card */}
            {heroViewMode === 'metrics' && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-emerald-500 relative space-y-5">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white shadow-md relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-2xl font-black tracking-tight">Pragmatic BIM Solution</div>
                      <div className="text-emerald-200 text-xs italic font-serif mt-0.5">"{COMPANY_INFO.slogan}"</div>
                    </div>
                    <span className="bg-white/20 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase">
                      Official Academy
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-emerald-50 leading-relaxed font-medium">
                    15+ Years of active industry BIM project execution and training engineers across Saudi Arabia, UAE, Qatar, India, and UK.
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                    <div className="text-xl font-black text-emerald-600">15+ Yrs</div>
                    <div className="text-[11px] font-bold text-slate-700 mt-0.5">AEC Consulting</div>
                    <div className="text-[10px] text-slate-500">ISO 19650 Lead</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                    <div className="text-xl font-black text-emerald-600">100+</div>
                    <div className="text-[11px] font-bold text-slate-700 mt-0.5">Engineers</div>
                    <div className="text-[10px] text-slate-500">Placed in 5 Nations</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                    <div className="text-xl font-black text-emerald-600">45+</div>
                    <div className="text-[11px] font-bold text-slate-700 mt-0.5">Buildings</div>
                    <div className="text-[10px] text-slate-500">Modeled in Al ULA</div>
                  </div>
                </div>

                {/* Featured Project Callout */}
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-emerald-900 font-extrabold">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      AL ULA SHLAL RESORT DEVELOPMENT
                    </span>
                    <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full text-[10px] font-black">
                      CASE STUDY
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    400+ Coordinated MEP shop drawings and 45+ luxury resort buildings modeled in 4 months by our specialist team.
                  </p>
                </div>

                {/* Direct LMS Access */}
                <button
                  onClick={onOpenLms}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:scale-102"
                >
                  <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  <span>Launch Student LMS Portal & Interactive Classroom</span>
                </button>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
