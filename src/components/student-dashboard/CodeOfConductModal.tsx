import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, Sparkles, BookOpen } from 'lucide-react';

interface CodeOfConductModalProps {
  onClose: () => void;
}

export const CodeOfConductModal: React.FC<CodeOfConductModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] flex flex-col border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Learner Code of Conduct</h3>
              <p className="text-xs text-slate-500">Pragmatic BIM Solution Academic Standards</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-4 text-xs text-slate-600 leading-relaxed pr-1">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-2">
            <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              1. Minimum 75% Live Attendance Requirement
            </h4>
            <p>
              To qualify for the accredited ISO 19650 completion certificate and career placement drives, learners must maintain at least 75% attendance in all compulsory masterclasses and remedial workshops.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              2. Capstone Submission & Original Modeling Integrity
            </h4>
            <p>
              All Revit models (.rvt), Navisworks coordination files (.nwd), and Dynamo scripts must be authored individually. Plagiarism or uploading third-party proprietary project files without attribution is strictly prohibited.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-600" />
              3. Cohort Communication & Peer Respect
            </h4>
            <p>
              Keep discussions in the Slack/Community channels professional, collaborative, and constructive. Respect peer questions, share software tips, and support each other's career progression.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow cursor-pointer transition-colors"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
