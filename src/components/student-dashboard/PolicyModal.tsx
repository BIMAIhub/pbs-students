import React from 'react';
import { X, HelpCircle, Briefcase, FileCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PolicyModalProps {
  type: 'placement' | 'faq' | 'certification';
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] flex flex-col border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
              {type === 'placement' && <Briefcase className="w-5 h-5 text-emerald-600" />}
              {type === 'faq' && <HelpCircle className="w-5 h-5 text-emerald-600" />}
              {type === 'certification' && <FileCheck className="w-5 h-5 text-emerald-600" />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {type === 'placement' && 'Placement & Career Assistance Policy'}
                {type === 'faq' && 'Frequently Asked Questions (FAQ)'}
                {type === 'certification' && 'Course Completion & Certification Policy'}
              </h3>
              <p className="text-xs text-slate-500">Pragmatic BIM Solution (PBS) Academic Guidelines</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content depending on type */}
        <div className="flex-1 overflow-y-auto space-y-4 text-xs text-slate-600 leading-relaxed pr-1">
          {type === 'placement' && (
            <>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-2">
                <h4 className="font-bold text-emerald-950 text-sm">Dedicated Placement Drives & Hiring Partners</h4>
                <p>
                  PBS partners with 50+ tier-1 AEC consultancy firms, general contractors, and BIM service providers across UAE, Saudi Arabia, UK, Singapore, and India (e.g. L&T, Atkins, WSP, AECOM, Foster+Partners alum network).
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Eligibility Criteria for Campus Placement</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Completion of all 8 Capstone Project stages with minimum "Good" or "Excellent" score.</li>
                  <li>Attendance of 75% or higher in required masterclasses.</li>
                  <li>1-on-1 Portfolio review and mock interview clearance by Angel Mentor.</li>
                </ul>
              </div>
            </>
          )}

          {type === 'faq' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <h5 className="font-bold text-slate-900 mb-1">Q: How do I access class recordings?</h5>
                <p>A: Recordings are uploaded to the "Live Learning" schedule within 24 hours of session completion with lifetime access.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <h5 className="font-bold text-slate-900 mb-1">Q: What software versions are used?</h5>
                <p>A: We support Autodesk Revit 2024–2026, Navisworks Manage, ETABS v21, and Dynamo 2.x.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <h5 className="font-bold text-slate-900 mb-1">Q: Can I request 1-on-1 doubt clearing?</h5>
                <p>A: Yes, book slots in the weekly Remedial Sessions or post in the Slack cohort channel.</p>
              </div>
            </div>
          )}

          {type === 'certification' && (
            <>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-2">
                <h4 className="font-bold text-emerald-950 text-sm">ISO 19650 Global Accredited Certificate</h4>
                <p>
                  Upon fulfilling all course tasks and capstone submissions, you receive a tamper-proof digitally verifiable certificate with unique credential ID and QR verification.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Grading Rubric</h4>
                <p>
                  Grading is weighted: 40% Live Tasks & Continuous Evaluations, 45% Capstone 45-Storey Tower Project, and 15% Final Comprehensive BIM Manager Defense.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
