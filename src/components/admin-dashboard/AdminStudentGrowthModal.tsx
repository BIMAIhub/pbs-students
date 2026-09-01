import React, { useState } from 'react';
import { 
  X, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Save, 
  Sparkles, 
  GraduationCap, 
  Calendar, 
  AlertCircle 
} from 'lucide-react';
import { ManagedStudent, pbsAdminStore } from '../../utils/pbsAdminStore';
import { soundFx } from '../../utils/soundEffects';

interface AdminStudentGrowthModalProps {
  student: ManagedStudent;
  onClose: () => void;
  onUpdated: () => void;
}

export const AdminStudentGrowthModal: React.FC<AdminStudentGrowthModalProps> = ({
  student,
  onClose,
  onUpdated
}) => {
  const [attendance, setAttendance] = useState(student.attendancePercent);
  const [growthScore, setGrowthScore] = useState(student.growthScore);
  const [capstoneStatus, setCapstoneStatus] = useState(student.capstoneStatus);
  const [capstoneGrade, setCapstoneGrade] = useState(student.capstoneGrade);
  const [mentorRemarks, setMentorRemarks] = useState(
    'Student demonstrates exceptional modeling capabilities in Revit MEP, ISO 19650 execution, and Navisworks clash coordination. Highly punctual in submittals.'
  );

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      pbsAdminStore.updateStudent(student.studentId, {
        attendancePercent: Number(attendance),
        growthScore: Number(growthScore),
        capstoneStatus,
        capstoneGrade
      });

      soundFx.playSuccess();
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => {
        onUpdated();
        onClose();
      }, 1000);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-emerald-100 overflow-hidden animate-fadeIn text-slate-800">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Student Academic Growth & Evaluation</h3>
              <p className="text-xs text-emerald-200">{student.name} ({student.rollNumber})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Student growth metrics and academic grades saved!</span>
            </div>
          )}

          {/* Quick Metrics Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Growth Score Index */}
            <div className="p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Growth Index (XP)</span>
                <span className="text-xs font-black text-emerald-700 bg-white px-2 py-0.5 rounded-lg border border-emerald-200 shadow-2xs">
                  {growthScore} XP
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={growthScore}
                onChange={(e) => setGrowthScore(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                <span>Novice (100)</span>
                <span>Mastery (900+)</span>
              </div>
            </div>

            {/* Attendance % */}
            <div className="p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Live Attendance</span>
                <span className="text-xs font-black text-emerald-700 bg-white px-2 py-0.5 rounded-lg border border-emerald-200 shadow-2xs">
                  {attendance}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={attendance}
                onChange={(e) => setAttendance(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                <span>0% (Absent)</span>
                <span>100% (Perfect)</span>
              </div>
            </div>

          </div>

          {/* Capstone Status & Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Capstone Project Review</label>
              <select
                value={capstoneStatus}
                onChange={(e) => setCapstoneStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
              >
                <option value="Approved & Verified">Approved & Verified (Graduated)</option>
                <option value="Under Review">Under Review by Senior BIM Auditor</option>
                <option value="Pending Submission">Pending Submission</option>
                <option value="Revision Required">Revision Required</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Audit Grade</label>
              <select
                value={capstoneGrade}
                onChange={(e) => setCapstoneGrade(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-700"
              >
                <option value="A+ Distinction (95%+)">A+ Distinction (95%+)</option>
                <option value="A First Class (85-94%)">A First Class (85-94%)</option>
                <option value="B+ Certified (75-84%)">B+ Certified (75-84%)</option>
                <option value="Pending Evaluation">Pending Evaluation</option>
              </select>
            </div>

          </div>

          {/* Mentor Feedback */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Mentor Remarks & Technical Audit Notes</label>
            <textarea
              value={mentorRemarks}
              onChange={(e) => setMentorRemarks(e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Update Growth Record'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
