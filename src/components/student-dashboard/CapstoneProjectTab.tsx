import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ScrollReveal } from '../ScrollReveal';
import { 
  Check, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  FileText, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Upload, 
  ExternalLink,
  MessageSquare,
  Award
} from 'lucide-react';
import { CAPSTONE_STAGES_DATA } from './dashboardData';
import { CapstoneStage } from './types';

export const CapstoneProjectTab: React.FC = () => {
  const [expandedStageIndex, setExpandedStageIndex] = useState<number | null>(3); // default stage 3 expanded

  const toggleStage = (index: number) => {
    setExpandedStageIndex(expandedStageIndex === index ? null : index);
  };

  return (
    <div id="capstone-project-container" className="space-y-10 pb-16">
      {/* Top Stepper Milestone Bar matching screenshot 3 */}
      <ScrollReveal className="bg-white border border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="relative">
          {/* Connecting Green Horizontal Line */}
          <div className="absolute top-4 left-6 right-6 h-1 bg-emerald-100 -translate-y-1/2 z-0 rounded-full">
            <motion.div 
              className="h-full bg-emerald-600 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: `${(3 / (CAPSTONE_STAGES_DATA.length - 1)) * 100}%` }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>

          {/* Stepper Nodes Stage 0 to Stage 8 */}
          <div className="relative z-10 flex items-center justify-between">
            {CAPSTONE_STAGES_DATA.map((stage, idx) => {
              const isCompleted = idx <= 3;
              const isCurrent = idx === 3;
              
              return (
              <motion.button
                key={stage.stageNumber}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => setExpandedStageIndex(idx)}
                className="flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                {/* Circular Checked Node */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCurrent
                    ? 'bg-emerald-600 text-white border-white ring-4 ring-emerald-200 scale-110' 
                    : isCompleted
                      ? 'bg-emerald-600 text-white border-white shadow-sm'
                      : 'bg-white text-slate-300 border-slate-200'
                }`}>
                  <Check className={`w-4 h-4 stroke-[3] ${isCompleted ? 'block' : 'hidden'}`} />
                </div>
                {/* Label: Stage 0, Stage 1 */}
                <span className={`text-[11px] font-semibold mt-2 transition-colors ${isCompleted ? 'text-slate-500' : 'text-slate-400'}`}>
                  Stage
                </span>
                <span className={`text-xs font-bold transition-colors ${isCurrent ? 'text-emerald-700' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                  {stage.stageIndex}
                </span>
              </motion.button>
            )})}
          </div>
        </div>
      </ScrollReveal>

      {/* Project Stages Section */}
      <ScrollReveal delay={0.1} className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Project Stages
        </h2>

        {/* List of Stages matching screenshot 3 */}
        <ScrollReveal delay={0.1} className="space-y-4">
          {CAPSTONE_STAGES_DATA.map((stage, idx) => {
            const isExpanded = expandedStageIndex === idx;

            return (
              <div
                key={stage.stageNumber}
                id={`stage-card-${stage.stageNumber}`}
                className={`bg-white border transition-all rounded-2xl overflow-hidden ${
                  isExpanded 
                    ? 'border-emerald-300 shadow-md ring-1 ring-emerald-100' 
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleStage(idx)}
                  className="p-6 cursor-pointer flex items-start justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start gap-6">
                    {/* Big Stage Number: 00, 01, 02... */}
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter shrink-0 w-12 font-mono">
                      {stage.stageNumber}
                    </div>

                    {/* Title & Goal */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                          {stage.title}
                        </h3>

                        {/* Critical to Job Success Badge if present */}
                        {stage.isCritical && (
                          <span className="px-3 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                            CRITICAL TO JOB SUCCESS
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600">
                        {stage.goal}
                      </p>

                      {/* Status Row */}
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        {/* Excellent Badge */}
                        <span className="px-3 py-0.5 rounded-md bg-emerald-600 text-white text-xs font-semibold">
                          {stage.grade}
                        </span>

                        {/* Completed Pill */}
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{stage.status}</span>
                        </span>

                        {/* Due Date */}
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>Due Date <strong className="text-slate-700 font-semibold">{stage.dueDate}</strong></span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Chevron */}
                  <div className="shrink-0 text-slate-400 pt-1">
                    {isExpanded ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <ChevronUp className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Expandable Details Container */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/40 space-y-4">
                    {/* Mentor Feedback & Score */}
                    {stage.mentorFeedback && (
                      <div className="bg-white border border-emerald-100 rounded-xl p-4 shadow-2xs space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-emerald-800 font-bold">
                            <Award className="w-4 h-4" />
                            <span>Mentor Review by {stage.mentorName}</span>
                          </div>
                          <span className="font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                            Score: {stage.mentorScore}/100
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-emerald-50/40 p-3 rounded-lg border-l-2 border-emerald-500">
                          "{stage.mentorFeedback}"
                        </p>
                      </div>
                    )}

                    {/* Submitted Deliverables */}
                    {stage.submissionFiles && stage.submissionFiles.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Submitted Deliverables & Models
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {stage.submissionFiles.map((file, fIdx) => (
                            <div 
                              key={fIdx}
                              className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-lg hover:border-emerald-300 transition-colors"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                                  {file.type}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold text-slate-800 truncate">{file.name}</p>
                                  <p className="text-[10px] text-slate-400">{file.size}</p>
                                </div>
                              </div>
                              <button 
                                onClick={() => alert(`Downloading verified deliverable: ${file.name}`)}
                                className="p-1.5 text-slate-400 hover:text-emerald-700 rounded transition-colors cursor-pointer"
                                title="Download File"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button 
                        onClick={() => alert(`Stage ${stage.stageNumber} evaluation complete with 100% rubrics passed.`)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                      >
                        View Full Rubric & Grade Breakdown
                      </button>
                      <button 
                        onClick={() => alert(`Revit 3D Model viewer launched for Stage ${stage.stageNumber}`)}
                        className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Launch BIM 3D Inspection Viewer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </ScrollReveal>
      </ScrollReveal>
      {/* Admin Notice */}
      <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3 text-sm text-slate-500">
        <Sparkles className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <p>
          <strong>Note:</strong> Capstone project assignments, grading, and stage progression are actively managed by instructors via the Admin Portal. Your progress here will automatically sync when an admin evaluates your submissions.
        </p>
      </div>
    </div>
  );
};
