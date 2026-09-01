import React from 'react';
import { 
  Award, 
  Download, 
  MessageSquare, 
  HelpCircle, 
  Briefcase, 
  FileText, 
  Play, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Sparkles,
  Users,
  Box,
  Flame,
  Zap,
  Clock,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { soundFx } from '../../utils/soundEffects';
import { AnimatedCounter } from '../AnimatedCounter';
import { ScrollReveal } from '../ScrollReveal';

interface CourseOverviewTabProps {
  onOpenCohortLeaderboard: () => void;
  onOpenVideoClassroom: () => void;
  onOpenCodeOfConduct: () => void;
  onOpenCertificate: () => void;
  onOpenFaq: () => void;
  onOpenPlacementPolicy: () => void;
  onOpenCertificationPolicy: () => void;
}

export const CourseOverviewTab: React.FC<CourseOverviewTabProps> = ({
  onOpenCohortLeaderboard,
  onOpenVideoClassroom,
  onOpenCodeOfConduct,
  onOpenCertificate,
  onOpenFaq,
  onOpenPlacementPolicy,
  onOpenCertificationPolicy,
}) => {
  return (
    <div id="course-overview-container" className="space-y-8 pb-12">
      
      {/* Top Interactive Metric Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Academic Standing', val: 'Active', sub: 'Module 01 Enrolled', icon: Award, color: 'text-amber-600 bg-amber-50 border-amber-200' },
          { label: 'Evaluated Tasks', val: <><AnimatedCounter value={0} /> / <AnimatedCounter value={87} /></>, sub: 'Starting Module 1 Assignments', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
          { label: 'Active Study Streak', val: <>Day <AnimatedCounter value={1} /></>, sub: 'Fresh Cohort Enrollment', icon: Flame, color: 'text-orange-600 bg-orange-50 border-orange-200' },
          { label: 'BIM Skill Mastery', val: <>Level <AnimatedCounter value={1} /></>, sub: 'Starting from Module 1', icon: Zap, color: 'text-teal-600 bg-teal-50 border-teal-200' },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{m.label}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${m.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tight font-display">{m.val}</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">{m.sub}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Grid: Leaderboard Card (Left) + Important Links (Right) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
      >
        
        {/* Performance Leaderboard Banner Card */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="lg:col-span-8 bg-white border border-emerald-100/90 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-3 max-w-md">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cohort Performance Index</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Performance Leaderboard
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Track your BIM coordination submissions, task velocity, and peer rankings as you advance through each module in the Cohort Leaderboard.
              </p>
              
              <div className="pt-2">
                <button
                  id="view-cohort-performance-btn"
                  onClick={() => {
                    soundFx.playClick();
                    onOpenCohortLeaderboard();
                  }}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer inline-flex items-center gap-2 hover:scale-102"
                >
                  <span>VIEW COHORT PERFORMANCE</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Illustration of student with star ratings */}
            <div className="relative shrink-0 flex items-center justify-center w-44 sm:w-52">
              <div className="w-40 h-40 bg-gradient-to-tr from-emerald-100/70 via-teal-50 to-emerald-50 rounded-full flex items-center justify-center relative shadow-inner">
                {/* Floating 5-star badge */}
                <div className="absolute top-2 right-0 bg-white/95 backdrop-blur-sm border border-emerald-300 px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
                  <span className="text-[11px] font-bold text-emerald-700">★ Active</span>
                  <span className="text-[10px] font-bold text-slate-700">Cohort 2026</span>
                </div>
                
                {/* Avatar illustration visual */}
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-emerald-600 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" 
                      alt="Top Performer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-1.5 inline-block bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    Starting Module 1
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Progress Skeleton Rhythms */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '4%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 rounded-full"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Overall Cohort Progress: <strong className="text-emerald-700 font-bold">Starting from Module 1</strong></span>
              <span>0 / 87 Tasks Submitted (Fresh Enrollment)</span>
            </div>
          </div>
        </motion.div>

        {/* Important Links Right Card */}
        <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-500 tracking-wider uppercase mb-4 pb-2 border-b border-slate-100">
            Important Academic Links
          </h3>

          <div className="space-y-2.5">
            {/* Download Certificate */}
            <button
              id="link-download-certificate"
              onClick={() => {
                soundFx.playClick();
                onOpenCertificate();
              }}
              className="w-full text-left flex items-center gap-3 text-slate-700 hover:text-emerald-700 transition-all group p-2.5 rounded-xl hover:bg-emerald-50/70 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-2xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block">Download Official Certificate</span>
                <span className="text-[11px] text-slate-400">ISO 19650 Verifiable Credential</span>
              </div>
            </button>

            {/* Community at Slack / WhatsApp */}
            <a
              id="link-slack-community"
              href="https://join.slack.com"
              target="_blank"
              rel="noreferrer"
              className="w-full text-left flex items-center gap-3 text-slate-700 hover:text-emerald-700 transition-all group p-2.5 rounded-xl hover:bg-emerald-50/70"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-2xs">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block">Community at Slack & Discord</span>
                <span className="text-[11px] text-slate-400">2,400+ Active BIM Engineers</span>
              </div>
            </a>

            {/* Frequently Asked Questions */}
            <button
              id="link-faq"
              onClick={() => {
                soundFx.playClick();
                onOpenFaq();
              }}
              className="w-full text-left flex items-center gap-3 text-slate-700 hover:text-emerald-700 transition-all group p-2.5 rounded-xl hover:bg-emerald-50/70 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-2xs">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block">Frequently Asked Questions</span>
                <span className="text-[11px] text-slate-400">Software, LMS & Certification Help</span>
              </div>
            </button>

            {/* Placement Policy */}
            <button
              id="link-placement-policy"
              onClick={() => {
                soundFx.playClick();
                onOpenPlacementPolicy();
              }}
              className="w-full text-left flex items-center gap-3 text-slate-700 hover:text-emerald-700 transition-all group p-2.5 rounded-xl hover:bg-emerald-50/70 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-2xs">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block">100% Placement Policy & GCC Hiring</span>
                <span className="text-[11px] text-slate-400">Direct interviews in Dubai & India</span>
              </div>
            </button>

            {/* Course Completion and Certification Policy */}
            <button
              id="link-cert-policy"
              onClick={() => {
                soundFx.playClick();
                onOpenCertificationPolicy();
              }}
              className="w-full text-left flex items-center gap-3 text-slate-700 hover:text-emerald-700 transition-all group p-2.5 rounded-xl hover:bg-emerald-50/70 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-2xs">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block">Course Completion Policy</span>
                <span className="text-[11px] text-slate-400">75% attendance & Capstone rules</span>
              </div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Resources & Studio Video Preview Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Learning Resources & Video Studio
          </h2>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Self-Paced + Live Hybrid Mode
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Laptop Screen Mockup with Video Lesson */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              {/* Laptop Visual Preview */}
              <div className="relative mx-auto max-w-sm mb-5">
                <div className="bg-slate-900 rounded-t-2xl p-2.5 pt-3 shadow-lg border border-slate-800">
                  <div 
                    className="bg-slate-950 rounded-xl overflow-hidden relative aspect-video border border-slate-800 flex items-center justify-center group cursor-pointer" 
                    onClick={() => {
                      soundFx.playClick();
                      onOpenVideoClassroom();
                    }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80" 
                      alt="Revit Modelling Interface"
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" 
                    />
                    {/* Centered Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 ml-0.5 fill-current" />
                      </div>
                    </div>
                    {/* Header in mockup */}
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[10px] text-white/90 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                      <span className="font-bold">PBS BIM Professional Masterclass</span>
                      <span className="font-mono text-emerald-400">Module 02 : Basics of Revit</span>
                    </div>
                  </div>
                </div>
                {/* Laptop bottom bar base */}
                <div className="bg-slate-700 h-2.5 rounded-b-lg max-w-[92%] mx-auto shadow-sm"></div>
                <div className="bg-slate-500 h-1 w-16 mx-auto rounded-b"></div>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="btn-view-module"
                onClick={() => {
                  soundFx.playClick();
                  onOpenVideoClassroom();
                }}
                className="px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 hover:border-emerald-400 font-bold text-xs tracking-wider uppercase rounded-xl shadow-2xs hover:shadow transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
              >
                <span>OPEN CLASSROOM VIDEO STUDIO</span>
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>

          {/* Card 2: Learner Code of Conduct */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              {/* Illustration of document & checklist */}
              <div className="flex items-center justify-center py-4">
                <div className="relative w-48 h-36 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/50 rounded-2xl border border-emerald-200 flex items-center justify-center shadow-inner">
                  <div className="bg-white p-3.5 rounded-xl shadow-md border border-slate-100 w-36 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold border-b border-slate-100 pb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Best Practices</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>75% Live Attendance</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>LOD 400 Standards</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>1-on-1 Mentor Review</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1.5">
                  Learner Code of Conduct
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A comprehensive guide to project delivery, ISO 19650 protocols, and professional ethics with Pragmatic BIM Solution.
                </p>
              </div>
            </div>

            <div className="pt-5">
              <button
                id="btn-learner-code-of-conduct"
                onClick={() => {
                  soundFx.playClick();
                  onOpenCodeOfConduct();
                }}
                className="px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 hover:border-emerald-400 font-bold text-xs tracking-wider uppercase rounded-xl shadow-2xs hover:shadow transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
              >
                <span>READ LEARNER CODE OF CONDUCT</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
