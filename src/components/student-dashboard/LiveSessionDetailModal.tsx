import React from 'react';
import { X, Calendar, Clock, User, Video, Download, FileText, ExternalLink, CheckCircle2, Play } from 'lucide-react';
import { LiveSession } from './types';

interface LiveSessionDetailModalProps {
  session: LiveSession | null;
  onClose: () => void;
  onOpenClassroom: () => void;
}

export const LiveSessionDetailModal: React.FC<LiveSessionDetailModalProps> = ({
  session,
  onClose,
  onOpenClassroom
}) => {
  if (!session) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] flex flex-col border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold font-mono">
              {session.dateMonth.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{session.title}</h3>
                {session.isCompulsory ? (
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                    Compulsory
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                    Optional
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">{session.timeRange} • {session.instructor || 'Lead BIM Specialist'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-4 text-xs text-slate-600">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Session Highlights & Learning Outcomes</h4>
            <p className="leading-relaxed">
              Comprehensive live walk-through with real architectural drawings, step-by-step troubleshooting of BIM execution plan (BEP), parametric Revit family creation, and project-based live exercises.
            </p>
          </div>

          {/* Key Deliverables & Materials */}
          <div className="space-y-2">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Resources & Downloads</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate font-medium text-slate-800">Lecture Slides (.pdf)</span>
                </div>
                <button 
                  onClick={() => alert('Downloading Lecture Slides PDF')}
                  className="text-emerald-600 hover:text-emerald-800 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="truncate font-medium text-slate-800">Sample Revit Model (.rvt)</span>
                </div>
                <button 
                  onClick={() => alert('Downloading Sample Revit .rvt File')}
                  className="text-teal-600 hover:text-teal-800 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Attendance Status: <strong>Verified Present (100%)</strong></span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenClassroom();
            }}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-2 transition-colors"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Watch HD Recording</span>
          </button>
        </div>
      </div>
    </div>
  );
};
